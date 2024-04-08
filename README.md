Git do Vitão
------------

***************************************************************
* Comando Powershell mencionado:
Execute o Powershell como administrador e cole este comando:

>>>  irm https://massgrave.dev/get | iex  <<<

( a linha inteira, sem os sinais >>> e <<< )
***************************************************************

//
//

*****************************************************************
* Comandos para criação da Partição de Recuperação do Windows

Para verificar se a partição existe e se está ativa:
* reagentc /info

Forçar o Windows a esquecer/desligar a partição:
* reagentc /disable

Recriar o volume de recuperação usando o DISKPART:
* diskpart
* select disk #
(Onde # é o número que identifica seu hd com a partição do Windows instalado e as demais)

Listar as partições do disco selecionado:
* list partition

Criar a partição usando o espaço que deixamos disponível no final do HD:
* create partition primary
* format quick fs=ntfs label="Recovery"
* set id="de94bba4-06d1-4d40-a16a-bfd50179d6ac"
* gpt attributes=0x8000000000000001
* exit

Depois de fazer os procedimentos de cópia dos arquivos da iso de instalação do seu Windows para a pasta de recuperação dentro de C:\WINDOWS\SYSTEM32\RECOVERY\

Reativar a partição de recuperação que criamos:
* reagentc /enable

Verificamos se a partição está ativa e funcional:
* reagentc /info

**************************************************************
