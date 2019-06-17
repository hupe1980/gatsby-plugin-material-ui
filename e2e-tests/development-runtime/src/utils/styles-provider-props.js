import { jssPreset } from '@material-ui/styles';
import { create } from 'jss';

const jssOptions = {
  ...jssPreset(),
  insertionPoint: document.getElementById(`jss-insertion-point`),
};
const jss = create(jssOptions);

const stylesProviderProps = {
  // disableGeneration: false,
  // generateClassName: () => {},
  // injectFirst: false,
  jss,
};

export default stylesProviderProps;
