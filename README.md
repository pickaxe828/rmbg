##  RMBG⚡
A GUI background remover with a simple interface and make use of [REMBG](https://github.com/danielgatis/rembg), a Python background removal library.

## Requirements
* Python 3.9.x
* pip
* Node
* npm

## Build
1. Go to `py-src/` and install the requirements.

```bash
pip install -r requirements.txt
```
This would install all the dependencies for the Python script.

2. Go to the project root directory and run the following command:
```bash
npm i
```
This would install all the dependencies for Node JS part.

3. Run the following command to build the project:
```bash
npm run tauri build
```