import {useState} from 'react';
import useViewport from '../../hooks/viewport';
import '../../styles/navBar.css';

const DesktopNav=()=>{
    return (
        <div className="menuOptDesktop" style={{display:'flex', alignItems:'center', justifyContent:'space-evenly'}}>
            <span>Home</span>
            <span>Courses</span>
            <span>Practice</span>
            <span>Events</span>
            <span>Campus Ninjas</span>
            <span>Blogs</span>
        </div>
    )
}

const MobileNav=()=>{
    const [isOpen, setOpen] = useState(false);

    return(
        <>
            <div className="hamburger-contaainer" onClick={()=>setOpen(!isOpen)}>
                <span className={"stick stick-1" + (isOpen?" open":" close")}></span>
                <span className={"stick stick-2" + (isOpen?" open":" close")}></span>
                <span className={"stick stick-3" + (isOpen?" open":" close")}></span>
            </div>

            <div className="menuOpt" style={{display: isOpen?"flex": "none"}}>
                    <span>Home</span>
                    <span>Courses</span>
                    <span>Practice</span>
                    <span>Events</span>
                    <span>Campus Ninjas</span>
                    <span>Blogs</span>
            </div>
        </>
    )
}


const NavLinks = () =>{
    const {width} = useViewport();
    const breakPoint = 720;
    return(
        <>
            {
                width>breakPoint?
                <div style={{display:'flex', margin:'5px'}}>
                    <div style={{width:'75px', marginRight:'10px', cursor:'pointer', height:'26px', borderRadius:'3px'}}>
                        <img src="https://www.codingninjas.com/assets-landing/images/CNLOGO.svg" style={{width:'100%', height:'100%'}}></img>
                    </div>
                    <DesktopNav/>
                </div>
                :
                <div style={{display:'flex', margin:'5px', alignItems:'center'}}>
                    <MobileNav/>
                    <div style={{width:'75px', margin:'5px', cursor:'pointer', marginLeft:'10px', height:'26px', borderRadius:'3px'}}>
                        <img src="https://www.codingninjas.com/assets-landing/images/CNLOGO.svg" style={{width:'100%', height:'100%'}}></img>
                    </div>
                </div>
            }
        </>
    )
}

export default NavLinks;