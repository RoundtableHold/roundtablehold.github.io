@echo off
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python generate.py
IF %ERRORLEVEL% NEQ 0 (
    echo Failed to generate index.html
    pause
 ) ELSE (
    start "" "docs\index.html"
 )
 