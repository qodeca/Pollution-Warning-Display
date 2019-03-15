# Pollution-Warning-Display
Pollution Warning Display is an open source application that informs Grójec dwellers about actual air pollution, date, time, temperature, humidity and pressure in the City center.
##Requirements
**npm** version: **^6.4.1**<br/>
**node** version **^10.15.2**<br/>
**mongodb** version **^3.1.13**
## Installation
To install Pollution Warning Display you have to clone the repository first:
```bash
git clone https://github.com/qodeca/Pollution-Warning-Display.git
```
After cloning remember to run:
```bash
npm install
```
in each of the root directories:
```bash
Pollution-Warning-Display
    |--> client => RUN HERE
    |--> servers
        |--> fetch-data => RUN HERE
        |--> serve-data => RUN HERE
```
## Configuration
There are two configuration files:
```bash
Pollution-Warning-Display
    |--> client
    |--> servers
        |--> fetch-data
            |--> config.js => FIRST CONFIGURATION FILE
        |--> serve-data
            |--> config.js => SECOND CONFIGURATION FILE
```
To make an app work you have to set up both of existing configuration files
unless you want to run it with default settings. **Remember to paste a valid
API key into the first configuration file** If you don't
have any airly API key you can get one [here](https://developer.airly.eu/docs).
## Usage
To start application you have to run
```bash
npm start
```
in each of the root directories:
```bash
Pollution-Warning-Display
    |--> client => RUN HERE
    |--> servers
        |--> fetch-data => RUN HERE
        |--> serve-data => RUN HERE
```
## License
Copyright 2019 Qodeca

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
