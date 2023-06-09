import * as z from 'zod'

export const userAuthSchema = z.object({
    // write a message for the error
    email: z.string().email('El correo no es válido'),
    password: z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial'
        ),
    name: z
        .string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .optional(),
    cv: z.any().optional(),
})
