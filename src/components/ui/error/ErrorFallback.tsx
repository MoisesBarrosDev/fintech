import type { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
      <h2 className="text-xl font-semibold text-red-600">Algo deu errado!!</h2>

      <p className="text-sm text-gray-600">
        {error instanceof Error ? error.message : "Erro inesperado"}
      </p>

      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-[#eceadd] rounded-lg hover:bg-[#e0dccf]"
      >
        Tentar novamente
      </button>
    </div>
  );
}
