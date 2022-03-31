import { lighten, darken } from "polished";

export const shadeTemplate: {
  shade: number;
  degree: number;
}[] = [
  { shade: 50, degree: 0.4 },
  { shade: 100, degree: 0.3 },
  { shade: 200, degree: 0.2 },
  { shade: 300, degree: 0.1 },
  { shade: 400, degree: 0.05 },
  { shade: 500, degree: 0 },
  { shade: 600, degree: 0.05 },
  { shade: 700, degree: 0.1 },
  { shade: 800, degree: 0.15 },
  { shade: 900, degree: 0.2 },
];

export const getShade = (shade: number, degree: number, seedColor: string) => {
  if (shade < 500) return lighten(degree, seedColor);
  if (shade === 500) return seedColor;
  if (shade > 500) return darken(degree, seedColor);

  throw new Error(`Argument ${shade} is not a valid shade value`);
};

export const getAllShades = (seedColor: string) =>
  shadeTemplate.reduce(
    (obj, { shade, degree }) => ({
      ...obj,
      [shade]: getShade(shade, degree, seedColor),
    }),
    {}
  );
