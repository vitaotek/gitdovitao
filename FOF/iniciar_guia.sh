#!/bin/bash

# Se o script NÃO estiver rodando dentro do Konsole, ele se reinicia abrindo uma janela visual
if [ "$1" != "--no-fork" ]; then
    SCRIPT_PATH="$(realpath "${BASH_SOURCE}")"
    exec konsole --title "Servidor de Automação Fedora 44" -e bash "$SCRIPT_PATH" --no-fork
    exit 0
fi

DIR="$(cd "$(dirname "${BASH_SOURCE}")" && pwd)"
cd "$DIR"

echo "===================================================="
echo "      Iniciando Servidor de Automação Local         "
echo "===================================================="

# 1. Verifica se o Node.js está instalado no Fedora
if ! command -v node &> /dev/null; then
    echo "[AVISO]: Node.js não encontrado. Instalando agora..."
    sudo dnf install nodejs -y
    if [ $? -ne 0 ]; then
        echo "[ERRO]: Falha ao instalar o Node.js."
        echo "Pressione qualquer tecla para fechar..."
        read -n 1
        exit 1
    fi
    echo "[SUCESSO]: Node.js instalado corretamente."
fi

# 2. Inicia o servidor JavaScript em segundo plano
echo "Iniciando processo do server.js..."
node server.js > /dev/null 2>&1 &
SERVER_PID=$!

# Função de limpeza que mata o Node.js imediatamente ao sair
limpar_tudo() {
    echo ""
    echo "Fechando processos do Node.js..."
    kill $SERVER_PID 2>/dev/null
    exit 0
}

# Garante que a limpeza rode mesmo se o usuário fechar o Konsole no "X" manualmente
trap limpar_tudo EXIT

# Aguarda 2 segundos para o Node.js estabilizar e subir na porta 3000
sleep 2

# 3. Garante a renderização em Modo App Nativo (Isolado e limpo)
echo "Configurando renderizador de interface..."

URL_ALVO="file://$DIR/guia_fedora.html"

# Função definitiva e adaptada ao KDE Plasma 6 + Wayland para forçar o ícone customizado
abrir_modo_app() {
    # 1. Caminho absoluto da sua foto na pasta do projeto
    PATH_ICONE="$DIR/icone_app.png"

    # 2. Pasta de perfil totalmente isolada para desvincular o processo do navegador comum
    PERFIL_DIR="$DIR/.perfil_app"
    mkdir -p "$PERFIL_DIR"

    # 3. Descobre qual binário baseado em Chromium está ativo no Fedora
    if command -v chromium-browser &> /dev/null; then
        BINARIO="chromium-browser"
    elif command -v google-chrome &> /dev/null; then
        BINARIO="google-chrome"
    elif command -v brave &> /dev/null; then
        BINARIO="brave"
    elif command -v microsoft-edge &> /dev/null; then
        BINARIO="microsoft-edge"
    elif command -v opera &> /dev/null; then
        BINARIO="opera"
    elif command -v vivaldi &> /dev/null; then
        BINARIO="vivaldi"
    fi

    # 4. No Wayland, o arquivo DEVE espelhar a classe de execução exata do binário base.
    mkdir -p ~/.local/share/applications
    cat <<EOF > ~/.local/share/applications/${BINARIO}.desktop
[Desktop Entry]
Version=1.0
Name=Painel Fedora
Exec=$BINARIO --ozone-platform-hint=auto --user-data-dir=$PERFIL_DIR --app=$URL_ALVO
Icon=$PATH_ICONE
Terminal=false
Type=Application
StartupWMClass=$BINARIO
MimeType=text/html;
EOF

    # 5. Notifica o subsistema de aplicativos e o gerenciador de janelas KWin (KDE 6)
    update-desktop-database ~/.local/share/applications/ &>/dev/null
    kbuildsycoca6 &>/dev/null

    # 6. Dispara o navegador na linha principal (SEM o '&' no final).
    # O Bash ficará travado aqui monitorando esta janela especificamente.
    $BINARIO --ozone-platform-hint=auto --user-data-dir="$PERFIL_DIR" --app="$URL_ALVO" --window-size=950,850
}

# VERIFICAÇÃO EXTENDIDA: Se houver QUALQUER um destes motores base instalados, executa direto sem baixar
if command -v chromium-browser &> /dev/null || \
   command -v google-chrome &> /dev/null || \
   command -v brave &> /dev/null || \
   command -v microsoft-edge &> /dev/null || \
   command -v opera &> /dev/null || \
   command -v vivaldi &> /dev/null; then

    abrir_modo_app
else
    echo "----------------------------------------------------"
    echo "[AVISO]: Para abrir como uma janela independente limpa "
    echo "sem barras de navegação, precisamos de um motor Chromium."
    echo "----------------------------------------------------"
    echo -n "Nenhum navegador compatível achado. Instalar o Chromium agora? (s/n): "
    read -n 1 resposta
    echo ""

    if [[ "$resposta" =~ ^[Ss]$ ]]; then
        echo "Instalando Chromium..."
        sudo dnf install chromium -y
        if [ $? -eq 0 ]; then
            echo "[SUCESSO]: Motor instalado!"
            abrir_modo_app
        else
            echo "[ERRO]: Falha na instalação. Abrindo no Firefox com barras..."
            firefox --new-window "$URL_ALVO"
        fi
    else
        echo "Abrindo no navegador padrão com barras por limitação do sistema..."
        firefox --new-window "$URL_ALVO"
    fi
fi

# Assim que o comando acima terminar (janela for fechada), o script executa as linhas abaixo
echo "Janela encerrada pelo usuário."
limpar_tudo
