/**
 * @fileoverview Funciones de utilidad para el portfolio
 * @description Helpers reutilizables para formateo, validación y manipulación de datos
 * @author Herasi Silva
 * @version 1.0.0
 */

// ============================================================================
// UTILIDADES DE CLASES CSS
// ============================================================================

/**
 * Combina múltiples clases CSS condicionalmente
 * @description Filtra valores falsy y une las clases válidas
 * @param {...(string | boolean | undefined | null)} classes - Clases a combinar
 * @returns {string} Clases combinadas separadas por espacio
 * @example
 * cn("btn", isActive && "btn-active", isDisabled && "btn-disabled")
 * // => "btn btn-active" (si isActive es true y isDisabled es false)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ============================================================================
// UTILIDADES DE FORMATEO
// ============================================================================

/**
 * Formatea un precio en USD
 * @description Convierte un número a formato de moneda USD
 * @param {number} price - Precio a formatear
 * @param {boolean} [showDecimals=false] - Si mostrar decimales
 * @returns {string} Precio formateado (ej: "$150" o "$150.00")
 * @example
 * formatPrice(150) // => "$150"
 * formatPrice(150, true) // => "$150.00"
 */
export function formatPrice(price: number, showDecimals: boolean = false): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(price);
}

/**
 * Formatea un número de teléfono para WhatsApp
 * @description Elimina caracteres no numéricos excepto el signo +
 * @param {string} phone - Número de teléfono
 * @returns {string} Número limpio para usar en wa.me
 * @example
 * formatPhoneForWhatsApp("+58 414-511-6337") // => "584145116337"
 */
export function formatPhoneForWhatsApp(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

// ============================================================================
// UTILIDADES DE NAVEGACIÓN
// ============================================================================

/**
 * Realiza scroll suave hacia un elemento
 * @description Scrollea la página hacia el elemento con el ID especificado
 * @param {string} elementId - ID del elemento destino (sin #)
 * @param {number} [offset=80] - Offset en píxeles desde el top (para navbar fijo)
 * @returns {void}
 * @example
 * scrollToElement("contact") // Scrollea a la sección #contact
 * scrollToElement("projects", 100) // Con offset de 100px
 */
export function scrollToElement(elementId: string, offset: number = 80): void {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
}

// ============================================================================
// UTILIDADES DE VALIDACIÓN
// ============================================================================

/**
 * Valida un email
 * @description Comprueba si el string tiene formato de email válido
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 * @example
 * isValidEmail("test@example.com") // => true
 * isValidEmail("invalid-email") // => false
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Verifica si un string no está vacío
 * @description Comprueba si el string tiene contenido después de trim
 * @param {string} value - Valor a verificar
 * @returns {boolean} True si tiene contenido
 * @example
 * isNotEmpty("Hola") // => true
 * isNotEmpty("   ") // => false
 */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

// ============================================================================
// UTILIDADES DE CLIPBOARD
// ============================================================================

/**
 * Copia texto al portapapeles
 * @description Usa la API del Clipboard para copiar texto
 * @param {string} text - Texto a copiar
 * @returns {Promise<boolean>} True si se copió exitosamente
 * @example
 * const success = await copyToClipboard("herasidesweb@gmail.com")
 * if (success) console.log("Copiado!")
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Error al copiar al portapapeles:", error);
    return false;
  }
}

// ============================================================================
// UTILIDADES DE TIEMPO
// ============================================================================

/**
 * Crea un delay/pausa asíncrona
 * @description Útil para animaciones secuenciales o debouncing
 * @param {number} ms - Milisegundos a esperar
 * @returns {Promise<void>} Promesa que se resuelve después del delay
 * @example
 * await delay(1000) // Espera 1 segundo
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Crea una función debounced
 * @description Retrasa la ejecución hasta que pase el tiempo sin llamadas
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función debounced
 * @example
 * const debouncedSearch = debounce(handleSearch, 300)
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

// ============================================================================
// UTILIDADES DE DETECCIÓN
// ============================================================================

/**
 * Detecta si el dispositivo es móvil
 * @description Usa el user agent para detectar dispositivos móviles
 * @returns {boolean} True si es móvil
 * @example
 * if (isMobile()) showMobileMenu()
 */
export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Detecta si el código se ejecuta en el cliente
 * @description Útil para código que necesita el objeto window
 * @returns {boolean} True si está en el cliente
 * @example
 * if (isClient()) window.scrollTo(0, 0)
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}