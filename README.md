Git do Vitão
------------


***************************************************************

Vídeo: Como instalar Microsoft Store no Windows 11 IoT Enterprise LTSC

Comando para ser executado no Poweshell (como administador): wsreset -i

Link: https://apps.microsoft.com/detail/9nblggh4nns1

***************************************************************

//
//

***************************************************************

Descrição do vídeo: https://youtu.be/o8YfJpS98R4

Com um prêmio acumulado de mais de 7 bilhões de reais, diversos veículos de comunicação anunciando que você pode ser o mais novo bilionário, só faltou ensinarem como apostar, por onde apostar, como receber seu prêmio e se é confiável.

Neste vídeo eu vou responder a todas estas questões e te ensinar como fazer cada um destes passos para que você possa apostar em uma loteria americana e, quem sabe, se tornar o mais novo Bilionário!

Vale lembrar que se você ganhar a The Lotter não cobra comissão e os sorteios para a Power Ball acontecem Segundas, Quartas e Sábados, às 22:59, horário local.

* Site: https://www.thelotter.net/

* Informações extras sobre a The Lotter e para entender como esta empresa é operada, recomendo estes links:
* https://www.thelotter.com/about-us/
* https://find-and-update.company-information.service.gov.uk/company/06861915/filing-history
* https://offshoreleaks.icij.org/nodes/55075240
* https://authorisation.mga.org.mt/verification.aspx?lang=EN&company=653d15b5-4a2e-461c-8928-13cf3a03b2e5&details=1
* https://uk.linkedin.com/company/thelotter---lottery-tickets-and-results?trk=similar-pages

***************************************************************

//
//

***************************************************************

Baixar Windows 11 Enterprise LTSC 2024 FINAL em pt-BR: https://massgrave.dev/windows_ltsc_links

Baixar Windows 11 24H2 FINAL em pt-BR: https://massgrave.dev/windows_11_links

Baixar Windows 10 22H2 FINAL em pt-BR: https://massgrave.dev/windows_10_links

Baixar Office 2024 FINAL em pt-BR: https://gravesoft.dev/download_windows_office/office_c2r_links/

***************************************************************

//
//

***************************************************************

Como converter Windows 11 Enterprise LTSC 2024 para Windows 11 IoT Enterprise LTSC 2024

* sc config licensemanager start= auto & net start licensemanager
* sc config wuauserv start= auto & net start wuauserv
* changepk.exe /ProductKey CGK42-GYN6Y-VD22B-BX98W-J8JXD
* Reinicie o computador...

***************************************************************

//
//

***************************************************************

BCP47 tag para as línguas disponíveis para o Windows 11 Enterprise LTSC:

Tag da língua ---------	Língua

ar-SA -----------------	Arabic (Saudi Arabia)

bn-BD	----------------- Bangla (Bangladesh)

bn-IN -----------------	Bangla (India)

cs-CZ -----------------	Czech (Czech Republic)

da-DK -----------------	Danish (Denmark)

de-AT -----------------	Austrian German

de-CH -----------------	“Swiss” German

de-DE -----------------	Standard German (as spoken in Germany)

el-GR -----------------	Modern Greek

en-AU -----------------	Australian English

en-CA -----------------	Canadian English

en-GB -----------------	British English

en-IE -----------------	Irish English

en-IN -----------------	Indian English

en-NZ -----------------	New Zealand English

en-US -----------------	US English

en-ZA -----------------	English (South Africa)

es-AR -----------------	Argentine Spanish

es-CL -----------------	Chilean Spanish

es-CO -----------------	Colombian Spanish

es-ES -----------------	Castilian Spanish (as spoken in Central-Northern Spain)

es-MX -----------------	Mexican Spanish

es-US -----------------	American Spanish

fi-FI -----------------	Finnish (Finland)

fr-BE -----------------	Belgian French

fr-CA -----------------	Canadian French

fr-CH -----------------	“Swiss” French

fr-FR -----------------	Standard French (especially in France)

he-IL -----------------	Hebrew (Israel)

hi-IN -----------------	Hindi (India)

hu-HU -----------------	Hungarian (Hungary)

id-ID -----------------	Indonesian (Indonesia)

it-CH -----------------	“Swiss” Italian

it-IT -----------------	Standard Italian (as spoken in Italy)

jp-JP -----------------	Japanese (Japan)

ko-KR -----------------	Korean (Republic of Korea)

nl-BE -----------------	Belgian Dutch

nl-NL -----------------	Standard Dutch (as spoken in The Netherlands)

no-NO -----------------	Norwegian (Norway)

pl-PL -----------------	Polish (Poland)

pt-BR -----------------	Brazilian Portuguese

pt-PT -----------------	European Portuguese (as written and spoken in Portugal)

ro-RO -----------------	Romanian (Romania)

ru-RU -----------------	Russian (Russian Federation)

sk-SK -----------------	Slovak (Slovakia)

sv-SE -----------------	Swedish (Sweden)

ta-IN -----------------	Indian Tamil

ta-LK -----------------	Sri Lankan Tamil

th-TH -----------------	Thai (Thailand)

tr-TR -----------------	Turkish (Turkey)

zh-CN -----------------	Mainland China, simplified characters

zh-HK -----------------	Hong Kong, traditional characters

zh-TW -----------------	Taiwan, traditional characters


***************************************************************

//
//

***************************************************************

* Comando Powershell mencionado:
Execute o Powershell como administrador e cole este comando:

:::>   irm https://massgrave.dev/get | iex   <:::

(a linha inteira, sem as setinhas!!!)

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

Listar e selecionar as partições do disco selecionado:
* list partition
* list volume
* select volume # (Onde # é o número do volume da partição que está sendo selecionada, e este número pode ser diferente do número que identifica a própria partição. Fique atento!)

Criar a partição usando o espaço que deixamos disponível no final do HD:

Primeiro verifique o tipo de tabela de partição do seu disco. Se é GPT ou se é MBR.
* list disk

Caso apareça um * na coluna GPT então o disco está utilizando a tabela em GPT. Caso não apareça o asterisco significa que a partição utiliza uma tabela MBR.
Se o disco for GPT:

* create partition primary
* format quick fs=ntfs label="Recovery"
* set id="de94bba4-06d1-4d40-a16a-bfd50179d6ac"
* gpt attributes=0x8000000000000001

Se o disco for MBR:
* create partition primary id=27
* set id=27

Agora confirme que a partição de recuperação foi criada executando o comando:
* list vol

Para sair do DiskPart:
* exit

Depois de fazer os procedimentos de cópia dos arquivos da iso de instalação do seu Windows para a pasta de recuperação dentro de C:\WINDOWS\SYSTEM32\RECOVERY\

Reativar a partição de recuperação que criamos:
* reagentc /enable

Verificamos se a partição está ativa e funcional:
* reagentc /info

***************************************************************

//
//

**************************************************************

Desativar o UAC:

* Abra o RegEdit;
* Acesse o caminho: HKEY_LOCAL_MACHINE > Software > Microsoft > Windows > Current Version > Policies > System
* Dois cliques na chave "EnableLUA";
* Mude o valor para "0"
* Reinicie o computador.

**************************************************************

//
//

***************************************************************

* https://bit.ly/switchdovitao :P
