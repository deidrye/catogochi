import { z } from "zod";
import { catActionSchema, catPresetSchema, catSchema, catSliceSchema, createCatSchema } from "./schema";



export type CatPresetT = z.infer<typeof catPresetSchema>;
export type CatT = z.infer<typeof catSchema>;
export type CreateCatT = z.infer<typeof createCatSchema>;
export type CatActionT = z.infer<typeof catActionSchema>;
export type CatSliceT = z.infer<typeof catSliceSchema>;

