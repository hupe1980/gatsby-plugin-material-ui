import { jssPreset } from "@material-ui/styles";
import { create } from "jss";

const stylesProviderProps = {
  jss: create({ ...jssPreset(), insertionPoint: `mui-inject-first` }),
};

export default stylesProviderProps;
