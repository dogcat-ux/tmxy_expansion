import { createPortal } from 'react-dom'
const install=(child:any)=>{
  // 3.随便创建一个标签(元素)
  const oDiv = document.createElement('div');
  // 4.将创建好的标签添加到界面上
  document.body.appendChild(oDiv);
  // 5.将创建好的实例对象挂载到创建好的元素上
  createPortal(child,oDiv)

}
export default install;
