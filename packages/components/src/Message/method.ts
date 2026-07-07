import { createApp } from "vue";
import Message from "./message.vue";
import type { MessageFn, MessageInstance, MessageOptions, MessageParams, MessageType } from "./message";

const MESSAGE_START_OFFSET = 20;
const MESSAGE_GAP = 52;
const instances: MessageInstance[] = [];

// 把字符串参数统一转换成对象参数。
const normalizeOptions = (options: MessageParams): MessageOptions => {
  if (typeof options === "string") {
    return {
      message: options
    };
  }

  return options;
};

const createMessage = (options: MessageOptions): MessageInstance => {
  // 创建一个真实 DOM 容器，用来挂载 message 组件。
  const container = document.createElement("div");

  // 把容器放到 body 里。
  document.body.appendChild(container);

  let timer: number | undefined;
  let instance: MessageInstance;
  const offset = MESSAGE_START_OFFSET + instances.length * MESSAGE_GAP;

  // 先创建 app。
  // onClose 会传给 message.vue，点击关闭按钮时会调用它。
  const app = createApp(Message, {
    ...options,
    offset,
    onClose: () => {
      close();
    }
  });

  // 关闭消息。
  // 关闭时先清除定时器，再卸载 Vue 应用，最后删除 DOM 容器。
  const close = () => {
    if (timer) {
      window.clearTimeout(timer);
    }

    app.unmount();

    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }

    const index = instances.indexOf(instance);

    if (index !== -1) {
      instances.splice(index, 1);
    }
  };

  instance = {
    close
  };

  instances.push(instance);

  // 挂载组件。
  app.mount(container);

  // 如果 duration 大于 0，就自动关闭。
  if (options.duration !== 0) {
    timer = window.setTimeout(() => {
      close();
    }, options.duration ?? 3000);
  }

  return instance;
};

export const KyMessage = ((options: MessageParams) => {
  return createMessage(normalizeOptions(options));
}) as MessageFn;

const messageTypes: MessageType[] = ["success", "warning", "info", "error"];

messageTypes.forEach((type) => {
  KyMessage[type] = (options: MessageParams) => {
    return createMessage({
      ...normalizeOptions(options),
      type
    });
  };
});