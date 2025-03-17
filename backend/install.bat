:: filepath: e:\Github\ola-web-demo\backend\install-ola.bat
@echo off

:: Define the expected directory name
set "expected_dir=backend"

:: Extract the current directory name
for %%I in ("%cd%") do set "current_dir=%%~nxI"

:: Compare and act accordingly
if /I not "%current_dir%"=="%expected_dir%" (
    echo Error: This script must be run from the '%expected_dir%' directory.
    echo Please change your working directory to the proper one.
    exit /b 1
)

:: Check if the branch name is provided as an argument
if "%~1"=="" (
    echo Usage: %~nx0 ^<branch_name^>
    exit /b 1
)

:: Assign the first argument to the branch variable
set "branch=%~1"

:: Define the repository URL
set "repo_url=https://github.com/jal9o3/OLA.git"

:: Remove existing OLA installation, if any
rmdir /s /q ola_server\OLA

:: Clone the specified branch
git clone -b "%branch%" --single-branch "%repo_url%"

:: Take the needed directory and remove the cloned repository
move OLA\OLA ola_server
rmdir /s /q OLA