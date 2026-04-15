type CardErrorVendaProps = {
  message?: string;
  onRetry?: () => void;
};

export function CardErrorVenda({
  message = "Erro ao carregar vendas.",
  onRetry,
}: CardErrorVendaProps) {
  return (
    <div className="w-full flex items-center justify-center mt-10">
      <div className="w-full max-w-md bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm text-center">
        <div className="text-2xl mb-2">X</div>

        <h2 className="text-lg font-semibold text-red-700 mb-2">
          Algo deu errado
        </h2>

        <p className="text-sm text-red-600 mb-4">{message}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
}
