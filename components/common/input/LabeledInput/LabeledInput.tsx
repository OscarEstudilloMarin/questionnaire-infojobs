import { Input, InputProps } from '@/components/ui/input'
import { parseLabel } from './utils/parseLabel'

export interface LabeledInputProps extends InputProps {
    label: string
    parse?: boolean
}

const LabeledInput = ({
    label,
    parse = false,
    ...inputProps
}: LabeledInputProps): JSX.Element => {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-base font-normal leading-5">
                {parse ? parseLabel(label) : label}
            </p>
            <Input {...inputProps} />
        </div>
    )
}

export default LabeledInput
