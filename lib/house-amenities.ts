// Figma 2017:742 / 2017:743 "Amenidades y Servicios" — identical for both houses.
export const AMENITIES = {
  es: [
    ["WiFi de alta velocidad vía Starlink", "Aire acondicionado", "TV", "Sistema de sonido", "Lavadora", "Ventiladores de techo y portátiles"],
    ["Toallas de baño y alberca", "Shampoo y Acondicionador", "Gel de ducha", "Jabón de manos", "Loción corporal", "Secadora de cabello"],
    ["Juegos de mesa", "Se admiten mascotas", "Se permiten estancias de larga duración"],
  ],
  en: [
    ["High-speed WiFi via Starlink", "Air conditioning", "TV", "Sound system", "Washing machine", "Ceiling and portable fans"],
    ["Bath and pool towels", "Shampoo and conditioner", "Shower gel", "Hand soap", "Body lotion", "Hair dryer"],
    ["Board games", "Pets allowed", "Long-term stays allowed"],
  ],
} as { es: [string[], string[], string[]]; en: [string[], string[], string[]] };
