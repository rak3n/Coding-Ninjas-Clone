import '../styles/footer.css';
const Footer=()=>{
    return(
        <section>
        <footer>
            <div className="childFooter">
            <img className="footerImg" src='https://files.codingninjas.in/cn-logo-dark-9824.svg' height='70px'></img>
            <section className="section2">
            <div className="section">
                <h5 className="head">Coding Ninjas</h5>
                <div className="subHeading">
                    <span>About Us</span>
                    <span>Privacy Policy</span>
                    <span>Terms & Condition</span>
                    <span>Pricing & Refund Policy</span>
                    <span>Bug Bounty</span>
                    <span>Customers</span>
                    <span>Press Release</span>
                </div>
            </div>

            <div className="section">
                <h5 className="head">Products</h5>
                <div className="subHeading">
                    <span>Courses</span>
                    <span>Try courses for Free</span>
                    <span>Career Camp</span>
                    <span>Hire Talent</span>
                </div>
            </div>

            <div className="section">
                <h5 className="head">Community</h5>
                <div className="subHeading">
                    <span>CodeStudio</span>
                    <span>Blog</span>
                    <span>Events</span>
                    <span>Campus Ninja</span>
                    <span>Affilate</span>
                </div>
            </div>
            </section>

            <section className="section3">

                <div className="section">
                    <h5 className="head">follow us on</h5>
                    <div className="subHeading" style={{flexDirection:'row', flexWrap:'wrap'}}>
                        <span style={{display:'flex', alignItems:'center'}}>
                            <img src="https://files.codingninjas.in/0000000000003240.png" width="42px" height="42px" style={{marginRight:'1px'}}></img>
                        </span>
                        <span style={{textTransform:'none', display:'flex', alignItems:'center'}}>
                            <img src="https://files.codingninjas.in/0000000000003241.png" width="42px" height="42px" style={{marginRight:'1px'}}></img>
                        </span>
                        <span style={{textTransform:'none', display:'flex', alignItems:'center'}}>
                            <img src="https://files.codingninjas.in/0000000000003245.png" width="42px" height="42px" style={{marginRight:'1px'}}></img>
                        </span>
                        <span style={{textTransform:'none', display:'flex', alignItems:'center'}}>
                            <img src="https://files.codingninjas.in/0000000000003247.png" width="42px" height="42px" style={{marginRight:'1px'}}></img>
                        </span>
                        <span style={{textTransform:'none', display:'flex', alignItems:'center'}}>
                            <img src="https://files.codingninjas.in/0000000000003242.png" width="42px" height="42px" style={{marginRight:'1px'}}></img>
                        </span>
                        <span style={{textTransform:'none', display:'flex', alignItems:'center'}}>
                            <img src="https://files.codingninjas.in/telegram-8247.svg" width="42px" height="42px" style={{marginRight:'1px'}}></img>
                        </span>
                    </div>
                </div>

                <div className="section">
                    <h5 className="head">contact us</h5>
                    <div className="subHeading">
                        <div className="animatedspan" style={{display:'flex', margin:'5px'}}>
                            <img src="https://files.codingninjas.in/0000000000003251.png" width="18px" height="18px" style={{marginRight:'10px'}}></img>
                            <span style={{display:'flex', alignItems:'center'}}>1800-123-3598</span>
                        </div>
                        <div className="animatedspan" style={{display:'flex', margin:'5px'}}>
                            <img src="https://files.codingninjas.in/0000000000003250.png" width="18px" height="18px" style={{marginRight:'10px'}}></img>
                            <span style={{textTransform:'none', display:'flex', alignItems:'center'}}>contact@codingninjas.com</span>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </footer>

        <footer>

        </footer>
        </section>
    )
}

export default Footer;