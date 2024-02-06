import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type WarningProps = {
    message: string;
};

export default function Warning({ message }: WarningProps) {
    return (
        <div className="flex items-center gap-2 text-red-500">
            <ExclamationTriangleIcon className="h-5 w-5" />
            <span className="text-sm font-semibold">{message}</span>
        </div>
    );
}
