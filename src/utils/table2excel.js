import { saveAs } from 'file-saver';

export default filename => {
  const blob = new Blob([document.getElementById('exportable').innerHTML]);
  saveAs(blob, `${filename}.xls`);
};
