import '../../styles/navBar.css';
import NavLinks from './navLinks';



const NavBar=()=>{
    return(
        <div style={{position: 'sticky', zIndex:100, backgroundColor:'white', top:0, left:0, right:0}}>
            
            <nav className="mainNav">
                <NavLinks/>
                <div className="leftPromoMenu" style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
                    <span>My Classroom</span>
                    <span className="LoginBtn">Login</span>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;