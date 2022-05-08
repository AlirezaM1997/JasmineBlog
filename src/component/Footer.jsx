import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="site-footer text-[#00000099] relative">
      <div className="container mx-auto before:table before:content-[' ']">
        <div className="site-footer__inner flex flex-nowrap tablet:flex-col-reverse items-end relative after:clear-both">
          <div className="site-footer__section-left flex-auto pt-14 pb-[50px] pr-[30px] tablet:py-[25px] tablet:w-full tablet:text-center relative before:content-[''] before:absolute before:bottom-0 before:right-0 before:w-[60vw] before:h-full before:bg-[#eee] before:-z-[1] tablet:before:w-[100vw] tablet:before:bg-[#eee]">
            <div className="site-footer__section-inner relative">
              <ul className="navigation--footer p-0 m-0 font-bold uppercase font-[system-ui]">
                <li className="inline-block py-[0.2em] px-[0.4em]">
                  <Link
                    to={"#"}
                    className="leading-6 font-[14px] font-medium text-[#616263] inline-block hover:text-[#607027] transition-colors"
                  >
                    home
                  </Link>
                </li>
                <li className="inline-block py-[0.2em] px-[0.4em]">
                  <Link
                    to={"#"}
                    className="leading-6 font-[14px] font-medium text-[#616263] inline-block hover:text-[#607027] transition-colors"
                  >
                    home
                  </Link>
                </li>
                <li className="inline-block py-[0.2em] px-[0.4em]">
                  <Link
                    to={"#"}
                    className="leading-6 font-[14px] font-medium text-[#616263] inline-block hover:text-[#607027] transition-colors"
                  >
                    home
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="site-footer__section-right bg-[#eee] relative p-[35px] pr-[25px] w-[670px] laptop:p-[30px] fablet:pr-[25px] tablet:pr-[25px] tablap:w-[570px] tablet:w-full laptop:before:w-4 laptop:before:h-[200px] before:content-[''] before:absolute before:w-5 before:h-[255px] before:top-[35px] before:right-full before:bg-[#607027]">
            <div className="site-footer__section-inner relative">
              <div className="site-footer__section-top mb-[50px] laptop:mb-[60px] flex justify-between items-center">
                <div className="site-footer__logo md:max-w-[240px]">
                  <Link to={"/"} className="text-[#00000099]">
                    <img
                      src={require("../images/logopng.png")}
                      className="align-middle"
                    ></img>
                  </Link>
                </div>
                <div className="site-footer__social flex md:flex-1 md-pl-[30px] justify-end">
                  <div className="social-label mr-[15px] text-[#222] text-[15px] font-normal flex justify-center items-center opacity-50">
                    <span>Follow Us:</span>
                  </div>
                  <div className="social-links flex items-center flex-wrap -mx-[5px] justify-center">
                    <Link to={"#"} className="flex items-center">
                      <span className="social-links__icon w-[30px] h-[30px] rounded-full border-[1px] border-[#747474] opacity-80 mx-[5px] bg-opacity-0 relative inline-flex">
                        <FontAwesomeIcon
                          className="h-[12px] text-[#747474] fill-[#747474] absolute top-1/2 left-1/2 w-auto -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                          title="Follow us on facebook"
                          icon={faFacebookF}
                        ></FontAwesomeIcon>
                      </span>
                    </Link>
                    <Link to={"#"} className="flex items-center">
                      <span className="social-links__icon w-[30px] h-[30px] rounded-full border-[1px] border-[#747474] opacity-80 mx-[5px] bg-opacity-0 relative inline-flex">
                        <FontAwesomeIcon
                          className="h-[12px] text-[#747474] fill-[#747474] absolute top-1/2 left-1/2 w-auto -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                          title="Follow us on twitter"
                          icon={faTwitter}
                        ></FontAwesomeIcon>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="site-footer__section-bottom flex justify-between items-center">
                <div className="site-footer__copyright mt-[30px] pl-0 font-normal text-sm text[#222] opacity-60">
                  Jasmine ©. Made by Alireza .M
                </div>
                <div className="site-footer__subscribe ml-[30px] flex-auto max-w-[330px]">
                  <div className="subscribe-footer__inner">
                    <div className="subscribe-footer-text mb-[10px]">
                      <h3 className="subscribe-footer__title m-0 text-left text-sm font-light leading-5 opacity-60 text-[#141614cc]">
                        Sign up for our weekly newsletter
                      </h3>
                    </div>
                    <div className="subscribe-footer-box">
                      <form className="relative">
                        <div className="subscribe-form__fields max-w-[600px] mx-auto flex">
                          <input
                            className="mb-0 flex-auto py-[14px] px-[12px] rounded-none inline-block w-auto max-w-full min-w-[175px] border-0 outline-none font-normal text-sm align-middle bg-white text-[#000000cc] transition-all"
                            placeholder="Your email address"
                            type="email"
                          />
                          <button className="form-button py-0 px-3 min-w-[90px] min-h-[48px] bg-[#607027] border-0 outline-none text-white">
                            <span>Subscribe</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
