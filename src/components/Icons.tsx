import { CgMenuRightAlt } from 'solid-icons/cg'
import { IoGridOutline } from 'solid-icons/io'
import { IoDocumentTextOutline } from 'solid-icons/io'
import { BiRegularBriefcase } from 'solid-icons/bi'
import { IoSchoolOutline } from 'solid-icons/io'

const Category = (size: number = 34, color: string = "#94C6F2") =>  <IoGridOutline size={24} color="#191919" />;
const Docs = (size: number = 34, color: string = "#94C6F2") =>  <IoDocumentTextOutline size={24} color="#191919" />;
const Brief = (size: number = 34, color: string = "#94C6F2") =>  <BiRegularBriefcase size={24} color="#191919" />;
const uni = (size: number = 34, color: string = "#94C6F2") =>  <IoSchoolOutline size={24} color="#191919" />;
const Menu =  (size: number = 24, color: string = "#000000") => <CgMenuRightAlt size={24} color={color} />;
const Icon =  (size: number = 24, color: string = "#ffffff") => { 
  debugger;
  return <CgMenuRightAlt size={24} color={color} /> 
};

export const Icons = {

  Icon,
  uni,
  Menu,
  Brief,
  Category,
  Docs
}
  

