import React from "react";
import GitHub from "@mui/icons-material/GitHub";


function Footer() {
  return (
    <div className="flex flex-col gap-y-10 lg:flex-row w-full py-16 border">
      <div className="px-9 sm:px-12 flex flex-col gap-y-7">
        <svg viewBox="0 0 27.23 27.23" aria-hidden="true" className="w-12">
          <rect fill="#333333" width="27.23" height="27.23" rx="2"></rect>
          <polygon
            fill="#fff"
            points="5.8 21.75 13.66 21.75 13.67 9.98 17.59 9.98 17.58 21.76 21.51 21.76 21.52 6.06 5.82 6.04 5.8 21.75"
          ></polygon>
        </svg>

        <GitHub sx={{ fontSize: 50 }} />
      </div>
      <div className="flex flex-col gap-y-10 sm:flex-row lg:justify-between sm:flex-wrap w-full px-10">
        <FooterSection
          heading="Support"
          links={["Help", "Advisories", "Status", "Contact npm"]}
        />
        <FooterSection heading="Company" links={["About", "Blog", "Press"]} />
        <FooterSection
          heading="Terms & Policies"
          links={["Policies", "Terms of Use", "Code of Conduct", "Privacy"]}
        />
      </div>
    </div>
  );
}

export default Footer;

const FooterSection = ({ heading, links }) => {
  return (
    <div className="w-1/2 lg:w-1/3 flex flex-col gap-y-5 sm:gap-y-7 items-start">
      <h1 className="text-[15px] sm:text-[17px] font-poppins font-bold tracking-[1.3px]">{heading}</h1>
      <div className="flex flex-col gap-y-3 sm:gap-y-5">
        {links.map((elem, index) => {
          return <p key={index} className="font-poppins leading-8 text-[14px] sm:text-[16px]">{elem}</p>;
        })}
      </div>
    </div>
  );
};
