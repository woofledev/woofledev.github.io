:: getminipy.cmd; this windows script automates getting the python embeddable zip along with pip, which allows you to get a 32mb python installation up and running in a minute.
:: note that this is not a full fledged python install. i recommend using python's official setup tool for that.

@echo off
setlocal
cd /d %~dp0
:: you can change the folder name here if you want to
set foldername=minipy

mkdir %foldername%
echo Getting Python 3.8.10 Embeddable
C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -c Invoke-WebRequest -URI 'https://www.python.org/ftp/python/3.8.10/python-3.8.10-embed-amd64.zip' -OutFile '%cd%\%foldername%\embed.zip'
echo Getting the get-pip.py script
C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -c Invoke-WebRequest -URI 'https://bootstrap.pypa.io/get-pip.py' -OutFile '%cd%\%foldername%\get-pip.py'
echo Unzipping...
call :unzip "%cd%\%foldername%\" "%cd%\%foldername%\embed.zip"
del /f /q %cd%\%foldername%\embed.zip
echo Installing pip
%cd%\%foldername%\python.exe %cd%\%foldername%\get-pip.py
del /f /q %cd%\%foldername%\get-pip.py
echo.
echo Fixing pip (and other scripts)
echo Lib\site-packages>> %cd%\%foldername%\python38._pth
echo Done!
echo Press any key to exit.
pause>nul
exit 0

:: tools
:unzip <extractto> <newzip>
set vbs="%temp%\_.vbs"
if exist %vbs% del /f /q %vbs%
>%vbs%  echo Set fso = CreateObject("Scripting.FileSystemObject")
>>%vbs% echo If NOT fso.FolderExists(%1) Then
>>%vbs% echo fso.CreateFolder(%1)
>>%vbs% echo End If
>>%vbs% echo set objShell = CreateObject("Shell.Application")
>>%vbs% echo set FilesInZip=objShell.NameSpace(%2).items
>>%vbs% echo objShell.NameSpace(%1).CopyHere(FilesInZip)
>>%vbs% echo Set fso = Nothing
>>%vbs% echo Set objShell = Nothing
cscript //nologo %vbs%
if exist %vbs% del /f /q %vbs%
