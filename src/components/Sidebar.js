import {Link} from "react-router-dom"
import {BsPersonFill,BsUnlockFill,BsGearFill} from "react-icons/bs"
const Sidebar = ()=>{
    return(
        <div className="sidebar">
            <div className="sidebar__element">
            <h3><BsGearFill className="icon-2"/> Setting</h3>
            </div>
            <div className="sidebar__element">
            <Link to="/updatePassword" ><BsUnlockFill className="icon-1"/> Change Password</Link>
            </div>
            <div className="sidebar__element">
            <Link to="/updateName" ><BsPersonFill className="icon-1"/> Change Name</Link>
            </div>
        </div>
    )
}
export default Sidebar;