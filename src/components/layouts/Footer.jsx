function Footer(){
    return(
        <div className="container-fluid mt-2">
            <footer className="footer pt-0">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6">
                        <div className="copyright text-center text-lg-left text-muted">
                            &copy; 2020
                            <a
                            href="https://www.creative-tim.com"
                            className="font-weight-bold ml-1"
                            target="_blank"
                            rel="noreferrer"
                            >Creative Tim</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;