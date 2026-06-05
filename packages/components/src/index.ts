import type { App } from "vue";
// 组件
import { KyButton, KyButtonGroup } from "./Button";
import { KyIcon } from "./icon";
import {
  KyContainer,
  KyHeader,
  KyAside,
  KyMain,
  KyFooter
} from "./Container";
import { KyLink } from "./Link";
import { KyRow, KyCol } from "./Layout";
import {KyRadio, KyRadioGroup,KyRadioButton} from './Radio'
import { KyCheckbox , KyCheckboxGroup,KyCheckboxButton} from "./Checkbox";
import { KySwitch } from "./Switch";
import { KyInput } from "./Input";
import { KyDatePicker } from "./DatePicker";
<<<<<<< HEAD
import { KySelect, KyOption } from "./Select";
=======
import { KyUpload } from "./Upload";
>>>>>>> origin/hotfix

const components = [  
  KyButton,
  KyButtonGroup,
  KyIcon,
  KyContainer,
  KyHeader,
  KyAside,
  KyMain,
  KyFooter,
  KyLink,
  KyRow,
  KyCol,
  KyRadio,
  KyRadioGroup,
  KyRadioButton,
  KyCheckbox,
  KyCheckboxGroup,
  KyCheckboxButton,
  KySwitch,
  KyInput,
  KyDatePicker,
<<<<<<< HEAD
  KySelect,
  KyOption
=======
  KyUpload
>>>>>>> origin/hotfix
];

export {
  KyButton,
  KyButtonGroup,
  KyIcon,
  KyContainer,
  KyHeader,
  KyAside,
  KyMain,
  KyFooter,
  KyLink,
  KyRow,
  KyCol,
  KyRadio,
  KyRadioGroup,
  KyRadioButton,
  KyCheckbox,
  KyCheckboxGroup,
  KyCheckboxButton,
  KySwitch,
  KyInput,
  KyDatePicker,
<<<<<<< HEAD
  KySelect,
  KyOption
=======
  KyUpload
>>>>>>> origin/hotfix
};


// export default表示这个文件默认导出一个对象。
//Vue 规定：如果一个对象有 install 方法，那么它就可以被：
export default {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name!, component);
    });
  }
};
