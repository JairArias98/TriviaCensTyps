import { create } from "zustand";
import { preguntas } from "../preguntas";
import { mezclarOpciones } from "../componentes/mezclarOpciones";

interface triviaStoreState {
  preguntas: Pregunta[];
  pregIndex: number;
  preguntasMostradas: number[];
  respuestaSeleccionada: number | null;
  fondoBoton: string[];
  respuestasCorrectas: number;
  respuestasIncorrectas: number;
  mostrarResultados: boolean;
  resultados: any;
  mostrarBotonReinicio: boolean;

  setPreguntas: (index: number) => void;
  setPreguntasMostradas: (indices: number[]) => void;
  setRespuestaSeleccionada:(respuestaIndex:number|null)=>void
  setFondoBoton:(fondo:string[])=>void
  actualizarRespuestas:(esCorrecta:boolean)=>void
  setMostrarResultados:(mostrar:boolean)=>void
  reiniciarJuego:()=>void
}

interface Pregunta {
  id: number;
  pregunta: string;
  opciones: string[];
  respuesta: string;
  imagen: string;
}

export const useTriviaStore = create<triviaStoreState>((set) => ({
  preguntas: mezclarOpciones(preguntas),
  pregIndex: -1,
  preguntasMostradas: [],
  respuestaSeleccionada: null,
  fondoBoton: Array(preguntas[0]?.opciones.length).fill(""),
  respuestasCorrectas: 0,
  respuestasIncorrectas: 0,
  mostrarResultados: false,
  resultados: null,
  mostrarBotonReinicio: false,

  setPreguntas: (index:number) => set({ pregIndex: index }),
  setPreguntasMostradas: (indices) => set({ preguntasMostradas: indices }),
  setRespuestaSeleccionada: (respuestaIndex) =>set({ respuestaSeleccionada: respuestaIndex }),
  setFondoBoton: (fondo:string[]) => set({ fondoBoton: fondo }),
  actualizarRespuestas: (esCorrecta) => {
    set((state) => ({
      respuestasCorrectas: esCorrecta
        ? state.respuestasCorrectas + 1
        : state.respuestasCorrectas,
      respuestasIncorrectas: esCorrecta
        ? state.respuestasIncorrectas
        : state.respuestasIncorrectas + 1,
    }));
  },
  setMostrarResultados: (mostrar:boolean    ) => set({ mostrarResultados: mostrar }),

  reiniciarJuego: () => {
    const nuevasPreguntas = mezclarOpciones(preguntas);
    set({
       preguntas:nuevasPreguntas,
      pregIndex: -1,
      preguntasMostradas: [],
      respuestaSeleccionada: null,
      fondoBoton: Array(nuevasPreguntas[0]?.opciones.length).fill(""),
      respuestasCorrectas: 0,
      respuestasIncorrectas: 0,
      mostrarResultados: false,
      mostrarBotonReinicio: false,
    });
  },
}));
