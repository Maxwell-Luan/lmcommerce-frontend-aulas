import { createContext } from "react";

export type ContextCartCountType = {
    contextCartCount: number;
    setContextCartCount: (contextCartCount: number) => void; //Poderia colocar apenas que o tipo é uma Function também
}

export const ContextCartCount = createContext<ContextCartCountType>({
    contextCartCount: 0,
    setContextCartCount: () => {}
})