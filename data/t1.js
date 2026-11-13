window.QUIZ = {
 "key": "t1v2",
 "module": "Test 1",
 "docTitle": "Test 1 · Certamen integrador",
 "title": "Certamen integrador de todos los contenidos",
 "subtitle": "Recorre las tres unidades con formatos mixtos: selección múltiple, verdadero o falso, asociación, ordenar, completar y respuestas numéricas, más 3 casos clínicos cortos y 2 largos con cálculos de edad, Z-score, DNI, requerimientos y soporte nutricional.",
 "chips": [
  "Formatos mixtos",
  "3 casos cortos",
  "2 casos largos",
  "Unidades 1 · 2 · 3"
 ],
 "items": [
  {
   "sec": "Sección I · Preguntas de formatos mixtos (1–38)",
   "type": "tf",
   "t": "Tamizaje y evaluación nutricional: criterios",
   "q": "Indica si cada afirmación es verdadera o falsa.",
   "s": [
    {
     "p": "El tamizaje nutricional debe realizarse en las primeras 24–48 h del ingreso.",
     "v": true,
     "f": "Busca pesquisar precozmente el riesgo de desnutrir por la hospitalización."
    },
    {
     "p": "En el PNST, dos o más respuestas “sí” obligan a evaluación nutricional, seguimiento antropométrico y control de ingesta.",
     "v": true,
     "f": "Es el punto de corte del instrumento."
    },
    {
     "p": "Existe una herramienta de tamizaje única y específica validada para todo paciente pediátrico.",
     "v": false,
     "f": "No existe; se usan STAMP, PYMS, STRONGkids o PNST según el contexto."
    },
    {
     "p": "En el lactante menor se usa P/E, salvo que P/T sea ≥ +1 DE, en cuyo caso prima P/T.",
     "v": true,
     "f": "Es la excepción explícita de la norma revisada."
    },
    {
     "p": "En un escolar con obesidad severa (≥ +4 DS) los requerimientos se calculan con el peso real.",
     "v": false,
     "f": "Se usa peso ajustado = (real − ideal) × 0,25 + ideal."
    }
   ],
   "f": "El tamizaje selecciona a quién evaluar; la evaluación usa indicadores según edad y el peso de cálculo depende del estado nutricional."
  },
  {
   "t": "Tamizaje nutricional: interpretación del PNST",
   "q": "A la madre de un preescolar hospitalizado se le aplica el PNST: refiere que perdió peso sin querer (sí), que ha subido poco de peso en los últimos meses (no), que ha comido menos en las últimas semanas (sí) y que no ha bajado evidentemente de peso (no). ¿Cuál es la conducta?",
   "o": [
    "Sin riesgo: repetir el tamizaje recién al alta.",
    "Riesgo nutricional: realizar evaluación nutricional, considerar soporte, seguimiento antropométrico y control de ingesta y líquidos.",
    "Riesgo solo si además la albúmina es menor de 3,5 g/dL.",
    "Riesgo moderado: indicar de inmediato nutrición parenteral complementaria."
   ],
   "a": 1,
   "f": "En el PNST, dos o más respuestas “sí” definen riesgo nutricional y obligan a evaluación nutricional, soporte nutricional según corresponda, seguimiento de peso y talla, y control de ingesta y líquidos.",
   "x": [
    "Con dos respuestas positivas el niño ya cumple el criterio de riesgo; postergar la acción hasta el alta favorece la desnutrición hospitalaria.",
    "",
    "El PNST no incorpora parámetros bioquímicos; además, la albúmina se altera por estrés metabólico y fluidoterapia.",
    "El tamizaje positivo indica evaluar; la vía de soporte se decide después, y la NP no es primera elección con tubo digestivo funcionante."
   ]
  },
  {
   "t": "Antropometría: cálculo de Z-score",
   "q": "Al calcular el Z-score con el método de la diferencia entre desviaciones, un escolar presenta una talla ubicada entre +2 y +3 DE. ¿Qué diferencia debe usarse como denominador?",
   "o": [
    "La diferencia entre +3 y +2 DE.",
    "La diferencia entre +2 y +1 DE (desviaciones anteriores, hacia la mediana).",
    "La diferencia entre la mediana y +1 DE en todos los casos.",
    "La desviación estándar promedio de toda la curva."
   ],
   "a": 1,
   "f": "Z = (valor real − mediana) / diferencia entre las DS anteriores. Para un valor entre +2 y +3 DE, las desviaciones anteriores (hacia la mediana) son +2 y +1 DE, como en el ejemplo de 141 cm a los 8 años: (141 − 127,3)/(138,6 − 132,9) = +2,4.",
   "x": [
    "Es el intervalo donde está el valor, no el intervalo anterior que exige el método.",
    "",
    "La diferencia mediana–+1 DE solo se usa cuando el valor está entre +1 y +2 DE o entre la mediana y +1 DE.",
    "El método no usa una DS promedio; usa la diferencia concreta del tramo anterior al valor real."
   ]
  },
  {
   "type": "num",
   "t": "Antropometría: estimación del peso (APLS)",
   "q": "Escolar de 6 años en reanimación, sin posibilidad de pesarlo. Estima su peso con la ecuación APLS: 2 × (edad + 4).",
   "ans": 20,
   "tol": 0,
   "unit": "kg",
   "f": "2 × (6 + 4) = 20 kg. Luscombe (3 × edad + 7) daría 25 kg y Argall ((edad + 2) × 3) 24 kg. El peso estimado se reemplaza por uno medido apenas el niño esté estable."
  },
  {
   "type": "num",
   "t": "Requerimientos: peso ajustado",
   "q": "Escolar de 10 años con obesidad severa (≥ +4 DS): peso real 62 kg, peso ideal (mediana) 34 kg. Calcula el peso ajustado para estimar requerimientos.",
   "ans": 41,
   "tol": 0.1,
   "unit": "kg",
   "f": "(62 − 34) × 0,25 + 34 = 41 kg. En sobrepeso se usa peso ideal; en obesidad (+2 DS) la DS anterior; desde +4 DS, peso ajustado."
  },
  {
   "t": "Soporte nutricional: vía de acceso enteral",
   "q": "Escolar con secuela neurológica y deglución insegura, tubo digestivo funcionante, en quien se proyecta nutrición enteral por más de 6 semanas. ¿Qué acceso es el más adecuado?",
   "o": [
    "Sonda nasogástrica permanente.",
    "Nutrición parenteral central.",
    "Gastrostomía.",
    "Suplementación oral con módulos."
   ],
   "a": 2,
   "f": "Con TGI funcionante la primera opción es la NE; si la duración prevista supera las 6 semanas, se prefieren ostomías (gastrostomía; yeyunostomía si hay riesgo de aspiración). Las sondas son para corta duración.",
   "x": [
    "La SNG es un acceso de corta duración; su uso prolongado aumenta complicaciones locales y desplazamientos.",
    "Con tubo digestivo funcionante la NP no está indicada y el reposo digestivo genera atrofia del enterocito y traslocación bacteriana.",
    "",
    "La deglución insegura contraindica depender de la vía oral."
   ]
  },
  {
   "type": "match",
   "t": "Nutrición enteral: complicaciones y manejo",
   "q": "Asocia cada situación durante la NE con la conducta indicada.",
   "rows": [
    {
     "l": "Riesgo de broncoaspiración",
     "r": "Cabecera a 30–45°, BIC y procinéticos"
    },
    {
     "l": "Residuo gástrico > 500 mL",
     "r": "Procinéticos y cambio a vía postpilórica"
    },
    {
     "l": "Diarrea (≥ 5 deposiciones/día)",
     "r": "Disminuir velocidad y revisar osmolaridad y fármacos"
    },
    {
     "l": "Inestabilidad hemodinámica",
     "r": "Contraindica el inicio de la NE"
    },
    {
     "l": "Previsión de NE por más de 6 semanas",
     "r": "Ostomía de nutrición (gastrostomía)"
    }
   ],
   "extra": [
    "Aumentar la velocidad de infusión"
   ],
   "why": [
    "La posición y la infusión continua reducen el reflujo.",
    "Mejora el vaciamiento y evita el estómago.",
    "Antes de suspender se ajusta velocidad o fórmula; se descartan agentes oportunistas.",
    "Es la primera contraindicación de la NE.",
    "Las sondas son para corta duración."
   ],
   "f": "Antes de suspender la NE se baja la velocidad o se cambia la fórmula; la suspensión es la última medida."
  },
  {
   "type": "num",
   "t": "Nutrición enteral: progresión con riesgo de SRA",
   "q": "Preescolar de 12 kg con alto riesgo de síndrome de realimentación inicia NE por BIC a 2 mL/kg/h en 22 h, avanzando 1 mL/kg/h cada 24 h. ¿Qué volumen recibirá a las 48 h?",
   "ans": 1056,
   "tol": 0,
   "unit": "mL/día",
   "f": "0 h: 2 mL/kg/h; 24 h: 3; 48 h: 4 mL/kg/h → 4 × 12 × 22 = 1.056 mL/día. Con riesgo de SRA se avanza cada 12–24 h (no cada 8 h) y la meta se logra en 5–7 días."
  },
  {
   "type": "tf",
   "t": "Nutrición parenteral: características y aportes",
   "q": "Indica si cada afirmación es verdadera o falsa.",
   "s": [
    {
     "p": "La NP periférica tolera osmolaridades de hasta ~850 mOsm/L y se usa en periodos cortos.",
     "v": true,
     "f": "La vía central no tiene ese límite y se usa en soporte prolongado."
    },
    {
     "p": "Las fórmulas premezcladas incluyen todas las vitaminas y oligoelementos.",
     "v": false,
     "f": "Deben agregarse diariamente; omitirlos causa déficit de micronutrientes."
    },
    {
     "p": "El propofol aporta 0,1 g de lípidos y 1,1 kcal por mL, que deben descontarse del aporte lipídico.",
     "v": true,
     "f": "Se calcula siempre con peso real."
    },
    {
     "p": "La NP se inicia con ~50 % de los requerimientos y se ajusta para alcanzar la meta en 72 h.",
     "v": true,
     "f": "Según ASPEN 2019."
    }
   ],
   "f": "La NP exige calcular vía, osmolaridad, aportes no nutricionales (propofol) y micronutrientes."
  },
  {
   "type": "num",
   "t": "Nutrición parenteral: velocidad de infusión de glucosa",
   "q": "Lactante de 8 kg recibe 60 g/día de dextrosa por NP. Calcula la velocidad de infusión de glucosa (un decimal).",
   "ans": 5.2,
   "tol": 0.05,
   "unit": "mg/kg/min",
   "f": "60.000 mg / 1.440 min = 41,7 mg/min; / 8 kg = 5,2 mg/kg/min, sobre el máximo de 5 mg/kg/min: debe reducirse la carga de dextrosa."
  },
  {
   "t": "Enfermedad renal aguda: etiología",
   "q": "Preescolar con gastroenteritis y deshidratación severa evoluciona con oliguria, creatinina y BUN elevados; tras rehidratación, la función renal mejora en 48 h. ¿Qué tipo de AKI es más probable?",
   "o": [
    "Post-renal por obstrucción tubular.",
    "Pre-renal por disminución del flujo plasmático renal.",
    "Renal intrínseca por glomerulonefritis.",
    "Enfermedad renal crónica estadio G5."
   ],
   "a": 1,
   "f": "La hipoperfusión renal por hipovolemia es la causa pre-renal clásica: cae el flujo plasmático renal, aumentan compuestos nitrogenados y la función se recupera al restituir el volumen circulante.",
   "x": [
    "La causa post-renal implica obstrucción del flujo urinario; no se resolvería solo con hidratación.",
    "",
    "La lesión intrínseca no se revierte en 48 h con la sola reposición de volumen.",
    "La ERC exige alteración ≥ 3 meses; este es un cuadro agudo y reversible."
   ]
  },
  {
   "t": "Síndrome nefrótico: indicación dietoterapéutica",
   "q": "Escolar con síndrome nefrótico, edema y proteinuria masiva. ¿Qué indicación es correcta según el material?",
   "o": [
    "Régimen hiperproteico de 3–4 g/kg para reponer las pérdidas urinarias.",
    "Normoproteico (NSI), sodio < 1 g/día y líquidos según diuresis + 400 mL mientras haya edema.",
    "Restricción proteica a 0,6 g/kg para proteger el glomérulo.",
    "Líquidos libres y sodio normal, ya que la hipoalbuminemia se corrige con dieta."
   ],
   "a": 1,
   "f": "Pese a la pérdida proteica se indica normoproteico (NSI): un exceso aumenta la proteinuria y la carga renal. Con edema: sodio < 1 g/día y líquidos medidos (diuresis + 400 mL) para lograr balance negativo; la albúmina EV es tratamiento médico.",
   "x": [
    "El aporte hiperproteico no corrige la hipoalbuminemia y aumenta la proteinuria y el trabajo renal.",
    "",
    "No se indica restricción en pediatría: comprometería crecimiento y aumentaría el catabolismo.",
    "El edema exige restricción de sodio y líquidos; la hipoalbuminemia no se corrige solo con dieta."
   ]
  },
  {
   "t": "ERC pediátrica: fisiopatología del hipocrecimiento",
   "q": "¿Cuál de los siguientes mecanismos explica mejor la talla baja del niño con ERC?",
   "o": [
    "Exceso de IGF-1 que cierra precozmente los cartílagos de crecimiento.",
    "Resistencia a la hormona de crecimiento con menor IGF-1, sumada a acidosis metabólica, anemia y déficit nutricional.",
    "Hipercalcemia crónica por exceso de vitamina D activa.",
    "Aumento de eritropoyetina que desvía energía a eritropoyesis."
   ],
   "a": 1,
   "f": "En la ERC hay resistencia a la GH (menor expresión del transportador/receptor y menor IGF-1), y además acidosis (aumenta catabolismo), osteodistrofia, anemia, trastornos hidroelectrolíticos y déficit nutricional. Por eso se busca bicarbonato entre 22–24 mEq/L.",
   "x": [
    "El IGF-1 está disminuido, no aumentado.",
    "",
    "La ERC cursa con déficit de activación de vitamina D e hipocalcemia, que estimula la PTH.",
    "La síntesis de EPO está disminuida, lo que produce anemia."
   ]
  },
  {
   "t": "ERC: fósforo orgánico vs inorgánico",
   "q": "Adolescente en hemodiálisis con fósforo de 7,2 mg/dL consume a diario embutidos y bebidas cola. ¿Cuál es el fundamento de priorizar la restricción de estos productos?",
   "o": [
    "Su fósforo es orgánico y se absorbe solo 10 %.",
    "Contienen fósforo inorgánico de aditivos, con absorción cercana al 100 %, versus 40–60 % del fósforo orgánico.",
    "Aportan principalmente potasio, no fósforo.",
    "El fósforo de los alimentos procesados se elimina completamente en la diálisis."
   ],
   "a": 1,
   "f": "El fósforo inorgánico (fosfato disódico, ácido fosfórico, etc.) presente en ultraprocesados se absorbe casi en su totalidad, mientras el orgánico de alimentos naturales se absorbe 40–60 %. Restringir aditivos tiene alto impacto en la hiperfosfatemia.",
   "x": [
    "Es justamente al revés: es inorgánico y de alta absorción.",
    "",
    "Los aditivos fosfatados son la fuente relevante en estos productos.",
    "La diálisis no corrige por sí sola la hiperfosfatemia; se combina dieta, diálisis y quelantes."
   ]
  },
  {
   "t": "Terapia de reemplazo renal: elección en pediatría",
   "q": "¿Por qué, sin contraindicación específica, se prefiere la peritoneodiálisis sobre la hemodiálisis en el paciente pediátrico?",
   "o": [
    "Porque corrige el déficit de EPO y de vitamina D activa.",
    "Porque no requiere acceso vascular, es factible en lactantes, da mayor estabilidad hemodinámica, preserva más la función renal residual y requiere menor restricción de líquidos.",
    "Porque permite una dieta sin control de potasio ni fósforo.",
    "Porque es la única TRR que no requiere control nutricional."
   ],
   "a": 1,
   "f": "La PD evita punciones e infecciones del acceso vascular, puede realizarse en neonatos y lactantes, es hemodinámicamente más estable, mantiene más tiempo la función renal residual, permite menor restricción hídrica y favorece la integración escolar y familiar.",
   "x": [
    "Ninguna diálisis corrige las alteraciones hormonales (EPO, D3).",
    "",
    "Sigue siendo necesario controlar K y P según exámenes.",
    "Ambas modalidades requieren seguimiento nutricional estricto (incluida la absorción de glucosa del baño de PD)."
   ]
  },
  {
   "type": "order",
   "t": "ERC: técnica de doble cocción",
   "q": "Ordena los pasos de la técnica de doble cocción para disminuir el potasio de los alimentos.",
   "steps": [
    "Lavar, pelar y picar los alimentos",
    "Remojar por 12 h y eliminar el agua de remojo",
    "Cocer 5 minutos y eliminar el agua de cocción",
    "Repetir una segunda cocción de 5 minutos y desechar el agua",
    "Escurrir y servir, sin reutilizar el agua de cocción"
   ],
   "f": "Con K > 6,0 mEq/L (valor peligroso) la desmineralización es clave; el mineral pasa al agua, que nunca se reutiliza."
  },
  {
   "t": "Enfermedad respiratoria crónica: displasia broncopulmonar",
   "q": "Lactante con DBP moderada no logra crecer. ¿Qué indicación es coherente con los requerimientos revisados?",
   "o": [
    "Aportar 180 mL/kg/día de líquidos para mejorar la ganancia ponderal.",
    "Aumentar la densidad energética de la fórmula o leche materna, con FP 1,2–1,3, proteínas > 3 g/kg/día y líquidos ≤ 130–150 mL/kg/día.",
    "Usar exclusivamente MCT, ya que no generan CO2.",
    "Restringir proteínas si el nitrógeno ureico es < 5 mg/dL."
   ],
   "a": 1,
   "f": "En DBP se agregan 15–25 % de calorías (FP 1,2–1,3), proteínas > 3 g/kg/día y una restricción hídrica (≤ 130–150 mL/kg/día), por lo que se concentra o suplementa la fórmula/leche materna para lograr la densidad necesaria.",
   "x": [
    "Excede la restricción hídrica de la DBP moderada–severa y favorece edema pulmonar.",
    "",
    "Los MCT mejoran la absorción pero aumentan la producción de CO2, por lo que se usan con precaución.",
    "Un NU < 5 mg/dL indica que debe aumentarse el aporte proteico, no restringirlo."
   ]
  },
  {
   "t": "Fibrosis quística: fisiopatología pancreática",
   "q": "En la fibrosis quística, ¿cuál secuencia explica la insuficiencia pancreática exocrina?",
   "o": [
    "Exceso de secreción de bicarbonato → autodigestión acinar.",
    "Disfunción de CFTR en células ductales → menor secreción de cloro, bicarbonato y agua → jugo escaso y rico en proteínas que precipita → obstrucción ductal, autólisis y fibrosis.",
    "Destrucción autoinmune de los islotes de Langerhans → déficit de enzimas.",
    "Hipersecreción de secretina → hiperestimulación y agotamiento acinar."
   ],
   "a": 1,
   "f": "La CFTR ductal es esencial para secretar cloro y bicarbonato; al fallar, el jugo pancreático queda pobre en volumen y bicarbonato y rico en proteínas, que precipitan y obstruyen los conductos, con autólisis y reemplazo fibroso (IPE en 85–90 %).",
   "x": [
    "La secreción de bicarbonato está disminuida, no aumentada.",
    "",
    "La FQ no es autoinmune; la diabetes relacionada a FQ es tardía y por inflamación/destrucción insular.",
    "La secretina regula la secreción hidroelectrolítica; el defecto es del canal CFTR, no hormonal."
   ]
  },
  {
   "type": "tf",
   "t": "Trasplante: fases pre, peri y post-trasplante",
   "q": "Indica si cada afirmación es verdadera o falsa.",
   "s": [
    {
     "p": "En pre-trasplante hepático se indica energía 120–150 % del GER, proteínas 2–4 g/kg/día y colación nocturna.",
     "v": true,
     "f": "La falla hepática es altamente catabólica y con riesgo de hipoglicemia."
    },
    {
     "p": "ESPEN recomienda ayuno preoperatorio de 12 h para evitar broncoaspiración.",
     "v": false,
     "f": "Recomienda reducirlo a 6–8 h y dar bebida rica en CHO la noche anterior (800 mL) y 2 h antes (400 mL)."
    },
    {
     "p": "En el post-trasplante inmediato el factor proteico es 1,3–1,8.",
     "v": true,
     "f": "En el tardío baja a 1,2–1,5."
    },
    {
     "p": "La dieta de baja carga bacteriana se mantiene entre 1 y 6 meses según el trasplante y su evolución.",
     "v": true,
     "f": "Por la inmunosupresión."
    },
    {
     "p": "Al alta, el paciente deja de tener una condición crónica.",
     "v": false,
     "f": "Siempre mantiene la condición crónica de trasplantado."
    }
   ],
   "f": "Cada etapa del trasplante tiene objetivos distintos: optimizar el estado nutricional, acortar el ayuno (ERAS) y prevenir complicaciones metabólicas e infecciosas."
  },
  {
   "type": "match",
   "t": "Recién nacido pretérmino: clasificación",
   "q": "Asocia cada recién nacido con su clasificación según edad gestacional.",
   "rows": [
    {
     "l": "30+2 semanas",
     "r": "Prematuro extremo"
    },
    {
     "l": "33+2 semanas, 1.620 g",
     "r": "Prematuro moderado"
    },
    {
     "l": "35+4 semanas, 2.300 g",
     "r": "Prematuro tardío"
    },
    {
     "l": "38 semanas",
     "r": "Recién nacido de término"
    }
   ],
   "extra": [
    "Aborto (límite de viabilidad)"
   ],
   "why": [
    "< 32 semanas (o < 1.500 g).",
    "32–33+6 semanas y ≥ 1.500 g; además es de bajo peso (< 2.500 g).",
    "34–36+6 semanas.",
    "≥ 37 semanas."
   ],
   "f": "La clasificación por EG se complementa con el peso de nacimiento (EBPN < 1.000 g; MBPN < 1.500 g; BPN < 2.500 g) y con P/EG (PEG, AEG, GEG)."
  },
  {
   "t": "Recién nacido pretérmino: nutrición enteral trófica",
   "q": "¿Cuál es la indicación correcta de nutrición enteral trófica en un prematuro de 1.100 g?",
   "o": [
    "Iniciar a los 7 días con 50 mL/kg/día para suspender pronto la NP.",
    "Iniciar en las primeras 24–48 h con 10–20 mL/kg/día de leche materna, para favorecer el trofismo del enterocito y la adaptación intestinal.",
    "Evitarla hasta suspender la NP para no aumentar el riesgo de ECN.",
    "Usar fórmula de inicio concentrada al 18 % desde el primer día."
   ],
   "a": 1,
   "f": "La NE trófica (leche materna de la propia madre o donada) se inicia en las primeras 24–48 h con volúmenes de 10–20 mL/kg/día durante 5–10 días, sin intención nutricional; promueve trofismo, motilidad, actividad de lactasa e inmunidad.",
   "x": [
    "El inicio es precoz y con volúmenes pequeños; 50 mL/kg/día no es trófico.",
    "",
    "El ayuno prolongado favorece atrofia; la leche materna incluso reduce el riesgo de ECN.",
    "La primera opción es leche materna; una fórmula de término concentrada no es adecuada."
   ]
  },
  {
   "type": "cloze",
   "t": "Recién nacido pretérmino: fortificación según BUN",
   "q": "Completa el enunciado sobre el ajuste del fortificante de leche materna.",
   "text": "Con BUN entre 10 y 16 mg/dL se {0} la fortificación; con BUN menor de 10 mg/dL se {1} un nivel; con BUN mayor de 16 mg/dL se {2} un nivel. La fortificación se inicia a partir de las {3} de vida.",
   "blanks": [
    {
     "a": "mantiene",
     "o": [
      "mantiene",
      "aumenta",
      "disminuye",
      "suspende"
     ]
    },
    {
     "a": "aumenta",
     "o": [
      "mantiene",
      "aumenta",
      "disminuye",
      "suspende"
     ]
    },
    {
     "a": "disminuye",
     "o": [
      "mantiene",
      "aumenta",
      "disminuye",
      "suspende"
     ]
    },
    {
     "a": "2 semanas",
     "o": [
      "24 horas",
      "2 semanas",
      "6 semanas",
      "40 semanas"
     ]
    }
   ],
   "f": "El BUN refleja la suficiencia del aporte proteico; los niveles de fortificación son 2–4–6 %."
  },
  {
   "t": "Recién nacido pretérmino: inicio de aminoácidos parenterales",
   "q": "¿Cuándo y con qué aporte deben iniciarse los aminoácidos parenterales en un RN de muy bajo peso?",
   "o": [
    "Al tercer día de vida, con 0,5 g/kg/día.",
    "Dentro de las primeras 2 h de vida (no más allá de 6 h), con 1,5–2 g/kg/día.",
    "Recién cuando falla la NE, con 4 g/kg/día.",
    "No se aportan en la primera semana para evitar azoemia."
   ],
   "a": 1,
   "f": "El inicio precoz de aminoácidos (primeras 2 h, máximo 6 h) con 1,5–2 g/kg/día evita el catabolismo, mejora la tolerancia a la glucosa y la síntesis proteica; luego se progresa hacia 3,5–4 g/kg/día.",
   "x": [
    "El inicio tardío y bajo favorece el catabolismo y la restricción del crecimiento posnatal.",
    "",
    "La NP se inicia junto a la NE en la fase de adaptación, no solo cuando esta falla.",
    "La omisión de aminoácidos genera catabolismo; los requerimientos llegan a 3,5–4,5 g/kg/día."
   ]
  },
  {
   "t": "Cardiopatías congénitas: fisiopatología y dietoterapia",
   "q": "Lactante con comunicación interventricular amplia, fatiga al succionar y mal incremento ponderal. ¿Qué afirmación es correcta?",
   "o": [
    "Es una cardiopatía cianótica con cortocircuito de derecha a izquierda; requiere líquidos libres.",
    "Es una cardiopatía acianótica con cortocircuito de izquierda a derecha e hiperflujo pulmonar; se indica alta densidad energética (> 1 kcal/mL), volúmenes parciales disminuidos y restricción de líquidos (< 165 mL/kg/día).",
    "Al no tener cianosis, no tiene riesgo nutricional.",
    "Debe usarse fórmula diluida para disminuir el trabajo cardíaco."
   ],
   "a": 1,
   "f": "La CIV es acianótica con shunt I→D e hiperflujo pulmonar, con aumento del gasto energético y menor ingesta por fatiga. Se concentra o modula la fórmula (> 1 kcal/mL), se fracciona con volúmenes parciales disminuidos y se restringen líquidos.",
   "x": [
    "El shunt D→I y la cianosis corresponden a cardiopatías como la tetralogía de Fallot.",
    "",
    "Las cardiopatías con shunt e hiperflujo tienen alto riesgo de desnutrición (afectación de peso).",
    "Diluir disminuye la densidad energética en un paciente con restricción hídrica, agravando el déficit."
   ]
  },
  {
   "t": "Paciente crítico: fases del estrés metabólico",
   "q": "Escolar politraumatizado en su segundo día en UCIP, con PCR e IL-6 en ascenso e hiperglicemia de estrés. ¿Qué característica debe tener el aporte nutricional?",
   "o": [
    "Hipercalórico e hiperproteico.",
    "Hipocalórico e hiperproteico.",
    "Normocalórico e hipoproteico.",
    "Régimen cero hasta la fase de recuperación."
   ],
   "a": 1,
   "f": "En la fase aguda temprana (día 1–2), catabólica y con resistencia insulínica, se indica aporte hipocalórico e hiperproteico; en la fase tardía (día 3–7) normocalórico hiperproteico, y en recuperación hipercalórico hiperproteico.",
   "x": [
    "El aporte hipercalórico corresponde a la fase de recuperación anabólica; en la fase aguda favorece hiperglicemia y sobrealimentación.",
    "",
    "La proteína no se restringe en el crítico: el catabolismo proteico es máximo.",
    "El ayuno prolongado aumenta la pérdida de masa magra; se busca nutrición precoz."
   ]
  },
  {
   "t": "Paciente crítico: síndrome de realimentación",
   "q": "Según ASPEN 2020, en un niño con alto riesgo de síndrome de realimentación, ¿qué medida es correcta?",
   "o": [
    "Iniciar con el 100 % del VCT para recuperar rápido el peso.",
    "Restringir líquidos, sodio y proteínas durante la primera semana.",
    "Iniciar con 40–50 % del VCT, monitorizar electrolitos cada 12 h por 3 días y aportar tiamina 2 mg/kg (máximo 200 mg/día).",
    "Aportar solo glucosa endovenosa los primeros 5 días."
   ],
   "a": 2,
   "f": "La realimentación con glucosa e insulina provoca entrada intracelular de K, P y Mg y mayor uso de tiamina. Se inicia con 40–50 % del VCT, se vigilan electrolitos cada 12 h por 3 días y se aporta tiamina; no se recomienda restringir líquidos, proteínas ni sodio.",
   "x": [
    "El aporte completo inmediato es el principal desencadenante del SRA.",
    "ASPEN no recomienda restringir líquidos, proteínas ni sodio.",
    "",
    "La glucosa aislada estimula la insulina y precipita la hipofosfemia sin aportar sustratos completos."
   ]
  },
  {
   "t": "Enfermedad hepática: encefalopatía y lactulosa",
   "q": "¿Cuál es el mecanismo de la lactulosa en la encefalopatía hepática?",
   "o": [
    "Aporta aminoácidos ramificados que compiten con los aromáticos.",
    "Se fermenta en el colon a ácidos orgánicos, baja el pH y transforma NH3 en NH4+, no absorbible, que se elimina en las heces por su efecto laxante.",
    "Aumenta la síntesis hepática de urea.",
    "Inhibe la secreción de ácido gástrico."
   ],
   "a": 1,
   "f": "La lactulosa se fermenta en el colon, desciende el pH luminal y el amoníaco (NH3) queda como amonio (NH4+), que no se absorbe y se elimina por el efecto osmótico laxante; es primera línea junto a antibióticos intraluminales.",
   "x": [
    "Los AACR son una estrategia dietaria distinta, indicada solo en encefalopatía.",
    "",
    "Si el hígado no funciona, la ureogénesis está justamente alterada; la lactulosa actúa en el colon.",
    "Eso corresponde a los inhibidores de bomba de protones o antagonistas H2."
   ]
  },
  {
   "t": "Enfermedad hepática crónica: lípidos y colestasis",
   "q": "En un niño con enfermedad hepática crónica colestásica, ¿por qué se indica que el 30–50 % de las grasas sea MCT?",
   "o": [
    "Porque los MCT requieren más sales biliares y estimulan el flujo biliar.",
    "Porque no requieren solubilización micelar y pasan directamente al enterocito y a la circulación portal sin reesterificación; se absorben ~95 % incluso con colestasis.",
    "Porque aportan ácidos grasos esenciales que los LCT no contienen.",
    "Porque disminuyen la síntesis de amonio."
   ],
   "a": 1,
   "f": "En la colestasis falta bilis para formar micelas; los MCT se absorben sin micelas y pasan por vía portal, permitiendo cubrir energía. No aportan ácidos grasos esenciales, por lo que deben mantenerse LCT.",
   "x": [
    "Es lo contrario: su ventaja es no depender de sales biliares.",
    "",
    "Los MCT no aportan AGE; por eso no deben ser la única fuente de grasa.",
    "El amonio se relaciona con el metabolismo proteico y bacteriano, no con el tipo de grasa."
   ]
  },
  {
   "t": "Pancreatitis aguda: diagnóstico",
   "q": "Escolar con dolor epigástrico intenso y vómitos; lipasa 4 veces sobre el valor normal. ¿Qué afirmación es correcta?",
   "o": [
    "Se requiere obligatoriamente TAC para confirmar el diagnóstico.",
    "Con cuadro clínico compatible y lipasa ≥ 3 veces lo normal se cumplen 2 criterios y no se requiere imagen; el nivel de lipasa no se correlaciona con la gravedad.",
    "La lipasa elevada 4 veces indica pancreatitis severa.",
    "La amilasa es más específica y persiste elevada más tiempo que la lipasa."
   ],
   "a": 1,
   "f": "El diagnóstico requiere 2 de 3 criterios: clínica compatible, amilasa o lipasa ≥ 3 veces lo normal, imagen compatible. La magnitud de las enzimas no predice gravedad; el mejor marcador de gravedad es la PCR a las 48 h.",
   "x": [
    "La imagen se requiere cuando las enzimas están < 3 veces lo normal con clínica sugerente.",
    "",
    "La gravedad se define por falla orgánica y complicaciones (Atlanta) y se apoya en PCR, no en el nivel de enzimas.",
    "La lipasa tiene mayor sensibilidad/especificidad (~95 %) y persiste ~2 semanas versus ~5 días de la amilasa."
   ]
  },
  {
   "t": "Pancreatitis aguda moderada–severa: soporte nutricional",
   "q": "Adolescente con pancreatitis aguda moderada, sin vómitos ni íleo, en régimen cero. ¿Cuál es la conducta nutricional?",
   "o": [
    "Mantener régimen cero hasta normalizar la lipasa, aunque tome 2 semanas.",
    "Iniciar NE (SNG o SNY) dentro de las primeras 72 h; la NP se reserva si hay íleo, criticidad o no se logran las metas.",
    "Indicar NP total como primera opción para el reposo pancreático.",
    "Régimen común desde el día 1."
   ],
   "a": 1,
   "f": "Todo paciente con régimen cero por más de 5–7 días requiere soporte; la NE es la primera opción (menos infecciones y complicaciones) y puede iniciarse dentro de 72 h si no hay vómitos ni íleo; SNY en casos más graves o con intolerancia.",
   "x": [
    "La realimentación se guía por la clínica; las enzimas pueden tardar una semana o más en normalizarse.",
    "",
    "La NP tiene más complicaciones infecciosas; queda como alternativa en evolución desfavorable.",
    "Se progresa de forma escalonada (hídrico → líquido liviano → liviano) según tolerancia."
   ]
  },
  {
   "t": "Pancreatitis crónica: dietoterapia",
   "q": "Adolescente con pancreatitis crónica, esteatorrea y baja de peso. ¿Qué indicación es la más adecuada?",
   "o": [
    "Dieta hipergrasa con LCT para recuperar peso.",
    "Grasas 40–60 g/día con alto aporte de MCT, enzimas pancreáticas con cada comida, suplementación de vitaminas liposolubles y B12, y evitar alcohol.",
    "Dieta hipoproteica para disminuir la estimulación pancreática.",
    "Suprimir completamente las grasas de la dieta."
   ],
   "a": 1,
   "f": "El objetivo es disminuir la esteatorrea y el dolor y mejorar el estado nutricional: grasa moderada con MCT, enzimas (≈ 30.000 U por comida), vitaminas A, D, E, K y B12 (déficit de proteasas), antioxidantes y manejo de la alteración glucídica.",
   "x": [
    "Las grasas LCT en exceso aumentan esteatorrea y dolor.",
    "",
    "El paciente requiere aporte proteico aumentado por la desnutrición.",
    "La supresión total agrava el déficit energético y de AGE y vitaminas liposolubles."
   ]
  },
  {
   "type": "match",
   "t": "APLV: conducta según tipo de alimentación",
   "q": "Asocia cada situación con la conducta de primera elección.",
   "rows": [
    {
     "l": "Lactante con LME y APLV",
     "r": "Madre elimina toda PLV, con calcio y vitamina D"
    },
    {
     "l": "Lactante con alimentación mixta, sin anafilaxia",
     "r": "Fórmula extensamente hidrolizada"
    },
    {
     "l": "Lactante con antecedente de anafilaxia",
     "r": "Fórmula aminoacídica"
    },
    {
     "l": "Lactante que no responde a la FEH",
     "r": "Fórmula aminoacídica"
    },
    {
     "l": "Prueba de provocación en menor de 12 meses",
     "r": "Fórmula de inicio o continuación en dosis crecientes"
    }
   ],
   "extra": [
    "Bebida vegetal de almendras"
   ],
   "why": [
    "Se mantiene la LME; la madre recibe 1.000 mg de calcio y 800 UI de vitamina D.",
    "Es la primera opción terapéutica.",
    "En reacciones severas la FAA es primera opción.",
    "La FAA es la segunda opción.",
    "La leche fresca solo se usa después del año."
   ],
   "f": "La elección depende del tipo de alimentación y de la gravedad de la reacción; las bebidas vegetales no están indicadas en lactantes."
  },
  {
   "t": "APLV: diferencias IgE vs no IgE mediada",
   "q": "Lactante con APLV presenta urticaria y vómitos a los 20 minutos de recibir fórmula de inicio. ¿Qué afirmación es correcta?",
   "o": [
    "Es una reacción no IgE mediada; la prueba de provocación oral es segura en domicilio.",
    "Es una reacción IgE mediada; puede evolucionar a anafilaxia, y la prueba de provocación debe hacerse hospitalizado (contraindicada si hubo anafilaxia).",
    "Es una proctocolitis eosinofílica.",
    "Es una intolerancia a la lactosa; debe usarse fórmula sin lactosa."
   ],
   "a": 1,
   "f": "Las reacciones IgE mediadas son de inicio rápido (minutos a 2 h), con síntomas cutáneos, digestivos o respiratorios y riesgo de anafilaxia. La provocación oral (gold standard) se hace hospitalizado y está contraindicada si hay historia de anafilaxia.",
   "x": [
    "Las no IgE son tardías (hasta 48 h) y predominan los síntomas digestivos; esta presentación es inmediata.",
    "",
    "La proctocolitis eosinofílica es no IgE mediada, con rectorragia tardía.",
    "La lactosa es un disacárido, no una proteína: los lactantes con APLV en general la toleran bien."
   ]
  },
  {
   "type": "tf",
   "t": "Enfermedad celíaca: patogenia, clínica y tratamiento",
   "q": "Indica si cada afirmación es verdadera o falsa.",
   "s": [
    {
     "p": "La transglutaminasa desamina la gliadina y aumenta su afinidad por HLA-DQ2/DQ8.",
     "v": true,
     "f": "Esto activa linfocitos T y B."
    },
    {
     "p": "La anemia ferropénica es la manifestación extraintestinal más frecuente.",
     "v": true,
     "f": "Seguida de la talla baja en niños."
    },
    {
     "p": "La ausencia de diarrea descarta la enfermedad celíaca.",
     "v": false,
     "f": "Las formas atípicas y silentes son cada vez más frecuentes."
    },
    {
     "p": "Con daño mucoso activo, la primera etapa del régimen es sin gluten, lactosa, sacarosa ni fibra.",
     "v": true,
     "f": "La atrofia disminuye la lactasa y la absorción."
    },
    {
     "p": "La dieta libre de gluten puede suspenderse al normalizar la serología.",
     "v": false,
     "f": "Es estricta y de por vida."
    }
   ],
   "f": "Comprender la patogenia explica por qué la DLG es permanente y por qué al inicio se restringen también lactosa, sacarosa y fibra."
  },
  {
   "type": "match",
   "t": "EII: enfermedad de Crohn vs colitis ulcerosa",
   "q": "Asocia cada característica con la enfermedad en que es típica.",
   "rows": [
    {
     "l": "Inflamación transmural y lesiones discontinuas",
     "r": "Enfermedad de Crohn"
    },
    {
     "l": "Compromiso continuo desde el recto, limitado a la mucosa",
     "r": "Colitis ulcerosa"
    },
    {
     "l": "Fístula perianal",
     "r": "Enfermedad de Crohn"
    },
    {
     "l": "ASCA positivo con compromiso ileocecal",
     "r": "Enfermedad de Crohn"
    },
    {
     "l": "pANCA positivo",
     "r": "Colitis ulcerosa"
    }
   ],
   "why": [
    "Explica fístulas y estenosis.",
    "No compromete el íleon.",
    "Es exclusiva de la EC.",
    "Mayor riesgo de cirugía y malabsorción de B12 y sales biliares.",
    "Asociado a CU o subtipo colónico."
   ],
   "f": "La localización determina el impacto nutricional: ileal (malabsorción) o colónico (pérdidas de agua, electrolitos y hierro)."
  },
  {
   "t": "EII: nutrición enteral exclusiva",
   "q": "Escolar con enfermedad de Crohn luminal, inflamatoria (B1), de riesgo bajo y retraso del crecimiento. ¿Cuál es la terapia de inducción de primera línea?",
   "o": [
    "Corticoides sistémicos por 12 semanas.",
    "Nutrición enteral exclusiva con fórmula (habitualmente polimérica) por 6–8 semanas.",
    "Nutrición enteral parcial con dieta libre.",
    "Dieta sin residuos y fórmula elemental obligatoria."
   ],
   "a": 1,
   "f": "La NEE es la primera línea para inducir remisión en EC luminal leve–moderada: remisión comparable a corticoides, mejor cicatrización mucosa, mejora del crecimiento y sin efectos adversos esteroidales. La fórmula polimérica es tan eficaz como la elemental.",
   "x": [
    "Los corticoides suprimen el crecimiento lineal y la densidad ósea; la NEE es preferible.",
    "",
    "La NEP con dieta libre es menos eficaz y no se recomienda como estrategia de inducción.",
    "La fórmula elemental no ha mostrado superioridad sobre la polimérica."
   ]
  },
  {
   "t": "SIC: consecuencias de la resección ileal",
   "q": "Niño con resección de íleon terminal y colon en continuidad. ¿Qué complicación nutricional es esperable por la pérdida de ese segmento?",
   "o": [
    "Déficit de hierro por pérdida de su principal sitio de absorción.",
    "Déficit de vitamina B12 y malabsorción de sales biliares, con posible esteatorrea y riesgo de hiperoxaluria.",
    "Hipersecreción de enzimas pancreáticas.",
    "Mayor absorción de agua y sodio en el yeyuno."
   ],
   "a": 1,
   "f": "El íleon terminal reabsorbe sales biliares y vitamina B12; su pérdida altera la circulación enterohepática (esteatorrea) y, con colon presente, aumenta el oxalato soluble y su absorción colónica (hiperoxaluria/litiasis).",
   "x": [
    "El hierro se absorbe principalmente en duodeno y yeyuno proximal.",
    "",
    "La resección ileal no produce hipersecreción pancreática.",
    "El yeyuno absorbe rápido, pero es el colon el que rescata agua y sodio; la pérdida ileal no aumenta la absorción yeyunal."
   ]
  },
  {
   "t": "SIC: hidratación en yeyunostomía terminal",
   "q": "Escolar con yeyunostomía terminal sin colon en continuidad y débito elevado. ¿Qué indicación es correcta?",
   "o": [
    "Aumentar el agua libre y los jugos para compensar las pérdidas.",
    "Reponer agua y sodio con soluciones de rehidratación oral (glucosa + sodio en proporción definida), evitando bebidas hiperosmolares.",
    "Indicar fibra insoluble para espesar el débito.",
    "Restringir el sodio para disminuir el débito."
   ],
   "a": 1,
   "f": "En la yeyunostomía terminal se pierden agua y sodio; el agua sola o los líquidos hiperosmolares aumentan las pérdidas. La SRO (glucosa + sodio) favorece la absorción conjunta de sodio y agua.",
   "x": [
    "El agua libre y los jugos (hipotónicos/hiperosmolares) no reponen sodio y aumentan el débito.",
    "",
    "Sin colon no hay fermentación ni rescate; la fibra no sustituye la reposición hidroelectrolítica.",
    "La depleción de sodio es el problema; restringirlo la agrava."
   ]
  },
  {
   "sec": "Sección II · Casos clínicos cortos (39–41)",
   "kind": "Caso clínico corto 1",
   "area": "ERC · DNI con talla corregida",
   "title": "Adolescente con enfermedad renal crónica en etapa predialítica",
   "html": "<p><b>Antecedentes:</b> Tomás, sexo masculino, fecha de nacimiento 02/01/2013, evaluado el 11/11/2026. ERC estadio G4 secundaria a uropatía obstructiva congénita, sin terapia de reemplazo renal. Refiere inapetencia y consumo frecuente de embutidos.</p><p><b>Antropometría:</b> peso 41,8 kg; talla 142,5 cm.</p><div class='tbl'><table><tr><th>Referencia T/E (13 a 10 m, hombres)</th><th>−3 DE</th><th>−2 DE</th><th>−1 DE</th><th>Mediana</th></tr><tr><td>Talla (cm)</td><td>138,2</td><td>146,1</td><td>154,0</td><td>161,9</td></tr></table></div><div class='tbl'><table><tr><th>Referencia IMC/E (hombres)</th><th>L</th><th>M (mediana)</th><th>S</th></tr><tr><td>10 a 11 m (edad en que 142,5 cm es la mediana)</td><td>−1,6</td><td>17,0</td><td>0,11</td></tr><tr><td>13 a 10 m (edad cronológica)</td><td>−1,9</td><td>19,6</td><td>0,13</td></tr></table></div><p><b>Bioquímica:</b> K 5,8 mEq/L; P 6,9 mg/dL; HCO3 18 mEq/L; Hb 9,8 g/dL.</p>",
   "parts": [
    {
     "t": "Cálculo de edad cronológica",
     "q": "¿Cuál es la edad cronológica de Tomás a la fecha de evaluación?",
     "o": [
      "13 años 9 meses 9 días",
      "13 años 10 meses 9 días",
      "14 años 10 meses 9 días",
      "13 años 11 meses 9 días"
     ],
     "a": 1,
     "f": "Del 02/01/2013 al 02/11/2026 hay 13 años 10 meses; del 02/11 al 11/11 hay 9 días → 13 años 10 meses 9 días.",
     "x": [
      "Resta un mes de más: de enero a noviembre hay 10 meses.",
      "",
      "Suma un año: 2026 − 2013 = 13 años completos.",
      "Agrega un mes; el 02/12 aún no se cumple."
     ]
    },
    {
     "t": "Z-score T/E e indicación de corrección de edad",
     "q": "¿Cuál es el Z-score de T/E y qué implica para la evaluación?",
     "o": [
      "−1,2 DE: talla normal; se evalúa con edad cronológica.",
      "−2,5 DE: talla baja; los indicadores según edad (IMC/E) deben evaluarse con la edad corregida por talla (10 a 11 m).",
      "−3,0 DE: talla baja severa; se evalúa con P/T.",
      "−2,5 DE: talla baja; se mantiene la edad cronológica para el IMC/E."
     ],
     "a": 1,
     "f": "142,5 cm está entre −2 y −3 DE; las DS anteriores son −1 y −2 (154,0 − 146,1 = 7,9). Z = (142,5 − 161,9)/7,9 = −2,46 ≈ −2,5 DE. Con T/E ≤ −2 DE se corrige la edad según talla y se evalúan los indicadores “según edad” (IMC/E) con la edad en que esa talla es la mediana.",
     "x": [
      "Usa un denominador incorrecto; el valor está bajo −2 DE.",
      "",
      "No llega a −3 DE; además, en ≥ 5 años el indicador de estado nutricional es IMC/E, no P/T.",
      "Con talla baja, evaluar con edad cronológica subestima el exceso de peso."
     ]
    },
    {
     "t": "DNI con talla corregida y peso para requerimientos",
     "q": "Con IMC = 20,6 kg/m², ¿cuál es el DNI y qué peso usar para calcular requerimientos?",
     "o": [
      "Adolescente eutrófico (Z IMC/E +0,4) con talla baja; peso real 41,8 kg.",
      "Adolescente con sobrepeso según IMC/E (Z +1,5, evaluado según talla corregida) y talla baja para la edad; usar peso ideal ≈ 34,5 kg.",
      "Adolescente con obesidad (Z +2,1); usar peso ajustado.",
      "Adolescente con sobrepeso; usar peso real porque en ERC no se ajusta."
     ],
     "a": 1,
     "f": "Con LMS a la edad corregida: Z = [(20,6/17,0)^−1,6 − 1]/(−1,6 × 0,11) ≈ +1,5 → sobrepeso. DNI: “adolescente sexo masculino con sobrepeso según IMC y talla baja para la edad (evaluado según talla corregida)”. En escolar–adolescente con sobrepeso se usa peso ideal = IMC mediana × talla² = 17,0 × 1,425² ≈ 34,5 kg.",
     "x": [
      "+0,4 resulta de usar la edad cronológica, lo que no corresponde con talla baja.",
      "",
      "+2,1 sale de aplicar mal la fórmula; el valor correcto es +1,5.",
      "En sobrepeso se usa el peso ideal según la mediana."
     ]
    }
   ]
  },
  {
   "kind": "Caso clínico corto 2",
   "area": "RNPT · DNI y crecimiento",
   "title": "Recién nacido pretérmino en unidad de neonatología",
   "html": "<p><b>Antecedentes:</b> Sofía nace a las 30+0 semanas por preeclampsia materna severa. Peso de nacimiento 1.100 g, talla 38 cm, perímetro cefálico 26,5 cm.</p><p><b>Curvas de Alarcón-Pittaluga (30 semanas):</b> P/EG entre p3 y p10; T/EG entre p10 y p50; CC/EG &lt; p10; índice ponderal a las 30 semanas: p10 = 2,10 y p90 = 2,70.</p><p><b>Evolución:</b> a los 21 días de vida (33 semanas de EG corregida) pesa 1.450 g; una semana antes pesaba 1.300 g. Recibe leche materna fortificada; BUN 8 mg/dL.</p>",
   "parts": [
    {
     "t": "Índice ponderal y DNI al nacimiento",
     "q": "¿Cuál es el DNI al nacimiento?",
     "o": [
      "RNPT moderado, sexo femenino de 30 semanas, bajo peso de nacimiento, AEG, simétrico.",
      "RNPT extremo, sexo femenino de 30 semanas, muy bajo peso de nacimiento, PEG moderado con microcefalia, asimétrico.",
      "RNPT extremo, sexo femenino de 30 semanas, extremo bajo peso de nacimiento, PEG severo, simétrico.",
      "RNPT tardío, sexo femenino, PEG moderado sin microcefalia."
     ],
     "a": 1,
     "f": "< 32 semanas = prematuro extremo; 1.100 g = MBPN (< 1.500 g); P/EG p3–p10 = PEG moderado; CC/EG < p10 = microcefalia; IP = (1.100 × 100)/38³ = 2,00, bajo p10 (2,10) → asimétrico.",
     "x": [
      "A las 30 semanas es extremo, no moderado, y P/EG < p10 no es AEG.",
      "",
      "EBPN es < 1.000 g y PEG severo es < p3; además el IP es asimétrico.",
      "Tardío corresponde a 34–36+6 semanas."
     ]
    },
    {
     "type": "num",
     "t": "Velocidad de incremento ponderal",
     "q": "Calcula la velocidad de incremento ponderal de la última semana (un decimal).",
     "ans": 15.6,
     "tol": 0.1,
     "unit": "g/kg/día",
     "f": "(1.450 − 1.300) / [(1,450 + 1,300)/2] / 7 = 150 / 1,375 / 7 = 15,6 g/kg/día: dentro del rango ideal (15–18); insuficiente sería < 10 g/kg/día."
    },
    {
     "t": "Ajuste de fortificación y objetivos",
     "q": "Con BUN de 8 mg/dL, ¿cuál es la conducta respecto de la fortificación?",
     "o": [
      "Disminuir la fortificación un nivel.",
      "Mantener la fortificación.",
      "Aumentar la fortificación un nivel (ej. del 2 % al 4 %), ya que el BUN bajo sugiere aporte proteico insuficiente.",
      "Suspender el fortificante y usar fórmula de término."
     ],
     "a": 2,
     "f": "BUN < 10 mg/dL indica aporte proteico insuficiente: se aumenta la fortificación un nivel (2–4–6 %), buscando un crecimiento similar al intrauterino.",
     "x": [
      "Se disminuye con BUN > 16 mg/dL.",
      "Se mantiene con BUN 10–16 mg/dL.",
      "",
      "La fórmula de término no cubre los requerimientos del prematuro y la leche materna fortificada es la primera opción."
     ]
    }
   ]
  },
  {
   "kind": "Caso clínico corto 3",
   "area": "Fibrosis quística · requerimientos y enzimas",
   "title": "Escolar con fibrosis quística e insuficiencia pancreática",
   "html": "<p><b>Antecedentes:</b> Diego, 6 años, FQ con mutación grave (clase II). Peso 18 kg, sedentario por exacerbaciones. FEV1 65 % del teórico. Elastasa fecal 85 µg/g.</p><p><b>Balance de grasa (72 h):</b> ingiere 60 g/día y excreta 15 g/día.</p><p><b>Datos para el cálculo:</b> TMB OMS (niños 3–10 años) = 22,7 × peso + 495. Factor de actividad sedentario = 1,5. Coeficiente pulmonar con FEV1 40–79 % = 0,2. GET = OMS × (actividad + coef. pulmonar) × (0,93/coef. de absorción de grasa).</p>",
   "parts": [
    {
     "t": "Interpretación de la elastasa fecal",
     "q": "¿Cómo se interpreta la elastasa fecal de 85 µg/g?",
     "o": [
      "Función pancreática normal.",
      "Insuficiencia pancreática exocrina leve–moderada.",
      "Insuficiencia pancreática exocrina severa.",
      "No es interpretable en FQ; se requiere sondaje duodenal."
     ],
     "a": 2,
     "f": "Elastasa fecal: > 200 µg/g normal; 100–200 IPE leve–moderada; < 100 IPE severa. Es el gold standard no invasivo.",
     "x": [
      "Normal es > 200 µg/g.",
      "Corresponde a 100–200 µg/g.",
      "",
      "El sondaje con secretina es invasivo; la elastasa fecal es la prueba no invasiva de elección."
     ]
    },
    {
     "type": "num",
     "t": "Cálculo del gasto energético total en FQ",
     "q": "Calcula el GET estimado de Diego (redondea a la unidad).",
     "ans": 1905,
     "tol": 3,
     "unit": "kcal/día",
     "f": "TMB = 22,7 × 18 + 495 = 903,6 kcal. Absorción de grasa = (60 − 15)/60 = 0,75. GET = 903,6 × (1,5 + 0,2) × (0,93/0,75) ≈ 1.905 kcal/día."
    },
    {
     "t": "Dosis de enzimas pancreáticas",
     "q": "Según la pauta para mayores de 4 años, ¿qué dosis de lipasa corresponde iniciar con cada comida principal?",
     "o": [
      "2.000 UI por cada 120 mL.",
      "9.000 UI por comida principal y 4.500 UI por colación.",
      "18.000 UI por comida principal y 9.000 UI por colación.",
      "45.000 UI por comida, sin límite diario."
     ],
     "a": 1,
     "f": "> 4 años: iniciar con 500 UI de lipasa/kg por comida (500 × 18 = 9.000 UI) y 250 UI/kg por colación (4.500 UI). No sobrepasar 2.500 UI/kg/comida ni 10.000 UI/kg/día (colonopatía fibrosante).",
     "x": [
      "Es la pauta del lactante.",
      "",
      "Corresponde a 1.000 UI/kg (pauta de 1–4 años).",
      "45.000 UI es el máximo por comida (2.500 UI/kg); siempre existe límite diario."
     ]
    }
   ]
  },
  {
   "sec": "Sección III · Casos clínicos largos (42–43)",
   "kind": "Caso clínico largo 1",
   "area": "Paciente crítico · soporte nutricional",
   "title": "Lactante desnutrido con bronconeumonía en ventilación mecánica",
   "html": "<p><b>Antecedentes:</b> Benjamín, sexo masculino, fecha de nacimiento 05/02/2026, ingresa a UCIP el 11/11/2026 por bronconeumonía grave con VMI y sedación con propofol. Recibió solo agua de hierbas y leche diluida por 4 días previos por vómitos. Hemodinámicamente estable desde hace 12 h, sin vasoactivos.</p><p><b>Tamizaje (madre):</b> pérdida de peso sin querer (sí), poco aumento de peso (sí), come menos (sí), bajada evidente (no).</p><p><b>Antropometría:</b> peso 6,6 kg; longitud 71 cm.</p><div class='tbl'><table><tr><th>Referencia (hombres, 9 meses)</th><th>−3 DE</th><th>−2 DE</th><th>−1 DE</th><th>Mediana</th></tr><tr><td>P/E (kg)</td><td>6,4</td><td>7,1</td><td>8,0</td><td>8,9</td></tr><tr><td>L/E (cm)</td><td>65,2</td><td>67,5</td><td>69,7</td><td>72,0</td></tr></table></div><p><b>Bioquímica:</b> P 3,1 mg/dL; K 3,4 mEq/L; Mg 1,7 mg/dL; albúmina 2,9 g/dL; PCR 96 mg/L.</p><p><b>Datos:</b> Schofield hombres 0–3 años = 59,48 × peso − 30,33. El equipo fija un VCT meta (incluido FA, FP y crecimiento) de 540 kcal/día.</p>",
   "parts": [
    {
     "t": "Cálculo de edad",
     "q": "¿Cuál es la edad de Benjamín al ingreso?",
     "o": [
      "8 meses 6 días",
      "9 meses 6 días",
      "9 meses 16 días",
      "10 meses 6 días"
     ],
     "a": 1,
     "f": "Del 05/02/2026 al 05/11/2026 hay 9 meses; del 05/11 al 11/11, 6 días → 9 meses 6 días (lactante menor).",
     "x": [
      "Falta un mes.",
      "",
      "Suma 10 días extra.",
      "Sobra un mes."
     ]
    },
    {
     "t": "Z-score y DNI del lactante menor",
     "q": "¿Cuál es el DNI de Benjamín?",
     "o": [
      "Lactante menor, sexo masculino, eutrófico, talla normal.",
      "Lactante menor, sexo masculino, con desnutrición según P/E (Z −2,6) y talla normal (Z −0,4).",
      "Lactante menor con riesgo de desnutrir (Z P/E −1,3) y talla baja.",
      "Lactante menor con desnutrición severa según IMC/E."
     ],
     "a": 1,
     "f": "6,6 kg está entre −2 y −3 DE; DS anteriores −1 y −2 (8,0 − 7,1 = 0,9): Z = (6,6 − 8,9)/0,9 = −2,6 → desnutrición (≤ −2). L/E: 71 cm entre mediana y −1 (72,0 − 69,7 = 2,3): Z = −0,4 → normal. En < 1 año el indicador es P/E.",
     "x": [
      "El peso está bajo −2 DE.",
      "",
      "−1,3 resulta de usar como denominador la diferencia entre la mediana y −2 DE (1,8); además, la longitud es normal, no baja.",
      "El IMC/E se usa desde los 5 años."
     ]
    },
    {
     "t": "Tamizaje, riesgo de síndrome de realimentación e inicio del soporte",
     "q": "Considerando el tamizaje, el ayuno previo y la bioquímica, ¿con qué aporte inicial debe partir el soporte?",
     "o": [
      "540 kcal/día desde el primer día para revertir la desnutrición.",
      "216–270 kcal/día (40–50 % del VCT), con monitoreo de K, P y Mg cada 12 h por 3 días y tiamina 13,2 mg/día.",
      "108 kcal/día (20 %) y sin aporte proteico.",
      "Régimen cero hasta normalizar la PCR."
     ],
     "a": 1,
     "f": "PNST con 3 “sí” = riesgo; además hay DNT, ayuno/ingesta insuficiente y electrolitos en límite bajo → alto riesgo de SRA. Inicio con 40–50 % del VCT (0,4–0,5 × 540), electrolitos cada 12 h × 3 días y tiamina 2 mg/kg = 13,2 mg (máx 200 mg).",
     "x": [
      "El aporte completo inmediato es el principal gatillante del SRA.",
      "",
      "El aporte demasiado bajo y sin proteína favorece el catabolismo; la proteína no se restringe.",
      "La PCR elevada no contraindica la nutrición; el retraso aumenta la pérdida de masa muscular."
     ]
    },
    {
     "type": "num",
     "t": "Volumen inicial de la NE",
     "q": "Inicia NE por SNG en BIC a 2 mL/kg/h en 22 h. Calcula el volumen inicial diario (por su riesgo de SRA avanzará 1 mL/kg/h cada 12–24 h).",
     "ans": 290,
     "tol": 1,
     "unit": "mL/día",
     "f": "2 mL × 6,6 kg × 22 h = 290 mL/día. Por desnutrición y riesgo de SRA la progresión es cada 12–24 h, logrando la meta en 5–7 días."
    },
    {
     "t": "Ajustes del soporte por propofol",
     "q": "Recibe propofol 2 mg/kg/h (concentración 10 mg/mL; 1,1 kcal/mL; 0,1 g lípidos/mL). ¿Cuál es su aporte diario aproximado?",
     "o": [
      "≈ 3,5 kcal y 0,3 g de lípidos.",
      "≈ 35 kcal y 3,2 g de lípidos.",
      "≈ 350 kcal y 32 g de lípidos.",
      "No aporta energía."
     ],
     "a": 1,
     "f": "2 mg × 6,6 kg = 13,2 mg/h → 1,32 mL/h × 24 h = 31,7 mL/día → 31,7 × 1,1 ≈ 35 kcal y 31,7 × 0,1 ≈ 3,2 g de lípidos, que se descuentan del aporte lipídico y energético.",
     "x": [
      "Calcula por hora y no por día.",
      "",
      "Error de un orden de magnitud.",
      "El propofol es una emulsión lipídica con aporte energético."
     ]
    },
    {
     "t": "Fase metabólica y características del aporte",
     "q": "En las primeras 48 h de esta enfermedad crítica, ¿qué característica cualitativa debe tener el aporte?",
     "o": [
      "Hipercalórico, hiperproteico.",
      "Hipocalórico, hiperproteico.",
      "Normocalórico, hipoproteico.",
      "Hipercalórico, hipograso."
     ],
     "a": 1,
     "f": "En la fase aguda temprana (día 1–2) predomina el catabolismo con resistencia insulínica y producción endógena de glucosa: el aporte es hipocalórico e hiperproteico, coherente además con el inicio cauteloso por riesgo de SRA.",
     "x": [
      "Es propio de la fase de recuperación.",
      "",
      "La proteína no se restringe en la fase catabólica.",
      "No corresponde a la fase ni a la indicación del lactante."
     ]
    }
   ]
  },
  {
   "kind": "Caso clínico largo 2",
   "area": "Hepatopatía crónica · pre-trasplante",
   "title": "Preescolar con cirrosis colestásica en lista de trasplante hepático",
   "html": "<p><b>Antecedentes:</b> Martina, sexo femenino, fecha de nacimiento 20/06/2023, control el 11/11/2026. Enfermedad hepática crónica colestásica con cirrosis, hipertensión portal y várices esofágicas; ascitis moderada. En lista de trasplante hepático. Últimos días más irritable, con alteración del sueño.</p><p><b>Anamnesis alimentaria:</b> saciedad precoz, 3 tiempos de comida, ayuno nocturno de 11 h, deposiciones pálidas y grasosas.</p><p><b>Antropometría:</b> peso 13,0 kg (con ascitis); peso seco estimado 12,0 kg; talla 92 cm.</p><div class='tbl'><table><tr><th>Referencia P/T (mujeres, 92 cm)</th><th>−2 DE</th><th>−1 DE</th><th>Mediana</th></tr><tr><td>Peso (kg)</td><td>11,3</td><td>12,3</td><td>13,4</td></tr></table></div><p><b>Bioquímica:</b> albúmina 2,6 g/dL; INR 1,8; bilirrubina directa 6,2 mg/dL; amonio 95 µg/dL; glicemia en ayunas 58 mg/dL; Na 133 mEq/L.</p><p><b>Datos:</b> Schofield mujeres 3–10 años = 20,3 × peso + 485,9; FA 1,1; FP 1,5.</p>",
   "parts": [
    {
     "t": "Cálculo de edad",
     "q": "¿Cuál es la edad de Martina?",
     "o": [
      "3 años 4 meses 22 días",
      "3 años 5 meses 22 días",
      "2 años 4 meses 22 días",
      "3 años 4 meses 9 días"
     ],
     "a": 0,
     "f": "Del 20/06/2023 al 20/10/2026 hay 3 años 4 meses; del 20/10 al 11/11 hay 22 días (11 de octubre + 11 de noviembre).",
     "x": [
      "",
      "Suma un mes: el 20/11 aún no se cumple.",
      "Resta un año.",
      "Error en el conteo de días entre el 20/10 y el 11/11."
     ]
    },
    {
     "t": "Peso a utilizar y Z-score P/T",
     "q": "¿Qué peso usar y cuál es el diagnóstico según P/T?",
     "o": [
      "Peso con ascitis (13,0 kg): eutrófica, Z −0,4.",
      "Peso seco (12,0 kg): Z −1,3, riesgo de desnutrir; la ascitis enmascara el déficit.",
      "Peso seco: Z −2,4, desnutrición.",
      "No se puede evaluar P/T en hepatopatía."
     ],
     "a": 1,
     "f": "Con ascitis o edema se usa peso seco o peso de la mediana. 12,0 kg está entre −1 y −2 DE; DS anteriores mediana y −1 (13,4 − 12,3 = 1,1): Z = (12,0 − 13,4)/1,1 = −1,3 → riesgo de desnutrir.",
     "x": [
      "El peso con ascitis sobreestima la masa corporal.",
      "",
      "Error de denominador; el valor no llega a −2 DE.",
      "Debe evaluarse, estimando el peso por la sobrecarga de fluidos."
     ]
    },
    {
     "type": "num",
     "t": "Requerimiento energético en EHC",
     "q": "Con peso seco, calcula el GET estimado sin crecimiento (redondea a la unidad).",
     "ans": 1204,
     "tol": 3,
     "unit": "kcal/día",
     "f": "TMB = 20,3 × 12 + 485,9 = 729,5 kcal; GET = 729,5 × 1,1 × 1,5 ≈ 1.204 kcal/día (FP 1,4–2,0 en EHC)."
    },
    {
     "t": "Aporte proteico ante signos de encefalopatía",
     "q": "Con amonio de 95 µg/dL, irritabilidad y alteración del sueño, ¿cuál es la indicación proteica?",
     "o": [
      "Restricción a 0,5 g/kg/día de forma permanente.",
      "Mantener 2–3 g/kg/día; restringir (< 2 g/kg/día) solo temporalmente si la encefalopatía es aguda; priorizar AACR, proteína vegetal y lácteos, y lactulosa.",
      "Hiperproteico de 5 g/kg/día con proteína animal.",
      "Suspender la proteína hasta el trasplante."
     ],
     "a": 1,
     "f": "En la EHC pediátrica se recomiendan 2–3 g/kg/día (hasta 4). En encefalopatía aguda puede requerirse restricción transitoria (< 2 g/kg/día), nunca prolongada por el consumo de proteína muscular. Se prefieren AACR, proteína vegetal + lácteos, y la lactulosa reduce el amonio.",
     "x": [
      "La restricción prolongada genera sarcopenia y empeora el pronóstico.",
      "",
      "Supera el máximo y la proteína animal aumenta la carga de amonio.",
      "Suspender la proteína induce catabolismo muscular."
     ]
    },
    {
     "t": "Lípidos, vitaminas liposolubles e INR",
     "q": "Ante esteatorrea e INR 1,8, ¿qué indicación es correcta?",
     "o": [
      "Disminuir las grasas al 10 % del VCT.",
      "30–50 % del VCT como grasa con predominio MCT (manteniendo AGE), suplementar vitaminas A, D, E y K (≈ 2 veces la RDA) y vitamina K según TP/INR.",
      "Solo LCT para asegurar ácidos grasos esenciales.",
      "Suplementar vitaminas hidrosolubles exclusivamente."
     ],
     "a": 1,
     "f": "La colestasis impide formar micelas: los MCT se absorben sin bilis. El déficit de vitaminas liposolubles es esperable; la vitamina K se ajusta controlando TP/INR, y se monitorizan niveles para evitar toxicidad.",
     "x": [
      "Una restricción severa agrava el déficit energético.",
      "",
      "Los LCT requieren micelas; en colestasis su absorción es deficiente.",
      "El déficit característico de la colestasis es de vitaminas liposolubles."
     ]
    },
    {
     "t": "Fraccionamiento, vía y prescripción",
     "q": "Con hipoglicemia en ayunas, saciedad precoz y várices, ¿qué plan es el más adecuado?",
     "o": [
      "Mantener 3 comidas y ayuno nocturno; gastrostomía para NE.",
      "Fraccionar en 5–7 tiempos con volúmenes parciales disminuidos y colación nocturna; si no cubre, NE nocturna por SNG (permitida con várices); gastrostomía contraindicada por ascitis.",
      "NP total por várices esofágicas.",
      "Régimen cero hasta el trasplante."
     ],
     "a": 1,
     "f": "Se evitan ayunos > 4 h (depleción de glucógeno), con 5–7 comidas, volúmenes disminuidos (saciedad por ascitis) y colación nocturna. La SNG sí puede usarse con várices; la gastrostomía está contraindicada por la ascitis y el riesgo de peritonitis.",
     "x": [
      "El ayuno nocturno prolongado explica su hipoglicemia y catabolismo; la GTT está contraindicada.",
      "",
      "La NP se reserva para intolerancia enteral o hemorragia varicosa recurrente.",
      "El ayuno empeoraría la desnutrición y la hipoglicemia."
     ]
    },
    {
     "t": "Sodio y manejo de la ascitis",
     "q": "¿Qué aporte de sodio corresponde por la ascitis?",
     "o": [
      "Sin restricción por la hiponatremia.",
      "1–2 mEq/kg/día (≈ 12–24 mEq/día), sin sal agregada.",
      "5 mEq/kg/día para corregir la hiponatremia.",
      "Restricción absoluta de sodio."
     ],
     "a": 1,
     "f": "El tratamiento de la ascitis incluye restricción de sodio a 1–2 mEq/kg/día (sin sal adicional en la preparación), diuréticos (espironolactona) si el Na urinario es bajo y albúmina EV en hipoalbuminemia. La hiponatremia suele ser dilucional.",
     "x": [
      "La hiponatremia suele ser dilucional; aportar sodio aumenta la retención y la ascitis.",
      "",
      "Aumenta la retención de agua y sodio.",
      "Una restricción absoluta es impracticable y riesgosa."
     ]
    }
   ]
  }
 ]
};
