import { FiUsers } from 'solid-icons/fi'
import { IoGridOutline } from 'solid-icons/io'
import { CgMenuRightAlt } from 'solid-icons/cg'
import { IoSchoolOutline } from 'solid-icons/io'
import { BiRegularBriefcase } from 'solid-icons/bi'
import { IoDocumentTextOutline } from 'solid-icons/io'

const Category = (size: number = 24, color: string = "#191919") =>  <IoGridOutline size={24} color={color} />;
const Docs = (size: number = 24, color: string = "#191919") =>  <IoDocumentTextOutline size={24} color={color} />;
const Brief = (size: number = 24, color: string = "#191919") =>  <BiRegularBriefcase size={24} color={color} />;
const uni = (size: number = 24, color: string = "#191919") =>  <IoSchoolOutline size={24} color={color} />;
const Menu =  (size: number = 24, color: string = "#000000") => <CgMenuRightAlt size={24} color={color} />;
const User =  (size: number = 24, color: string = "#000000") => <FiUsers size={24} color={color} />;
const Icon =  (size: number = 24, color: string = "#ffffff") => { 
  debugger;
  return <CgMenuRightAlt size={24} color={color} /> 
};

export const Icons = {

  Icon,
  uni,
  User,
  Menu,
  Brief,
  Category,
  Docs
}
  

