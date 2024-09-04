import { TypeAnimation } from "react-type-animation";

export const Typing = () => {
  return (
    <TypeAnimation
      sequence={[
        "Project Planner AI",
        3000, // wait 1s before replacing with the next text
        "Project Plan Generator",
        3000,
        "Project Strategy AI",
        3000,
        "Project Timeline AI",
        3000,
      ]}
      wrapper="span"
      speed={40}
      className="text-primary/75  text-sm md:text-lg"
      style={{ display: "inline-block" }}
      repeat={Infinity}
    />
  );
};
