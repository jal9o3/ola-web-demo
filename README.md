# ola-web-demo

A demo web interface for the OLA AI engine.

## Note on Purpose and Setup

This project explores the usage of a neural network for a Game of the Generals (GG) AI agent, focusing on strategy under imperfect information and training through self-play. It is built primarily for research and development and serves as a foundation for further work in this space. The installation process is geared toward developers, and requires some familiarity with developer tools like `git`, `pip`, and `npm`. While fully functional within its scope, it is not designed for casual or out-of-the-box use.

## Installation

### Clone this repository
Run the following commands:
```
git clone https://github.com/jal9o3/ola-web-demo.git

cd ola-web-demo
```

### Install the OLA engine

For Linux:

```
cd backend

chmod +x ./install-ola.sh

./install-ola.sh main
```

For Windows:

```
cd backend

.\install-ola.bat main
```

### Install the backend's dependencies
The following step assumes that `backend` is still the working directory (after
the previous step).

```
pip install -r requirements.txt
```

### Setup the backend's database
Run the following commands (assumes `backend` is still the working directory):
```
cd ola_server

python setup.py build_ext --inplace

python manage.py migrate
```

### Download the models
Run the following commands (assumes `backend/ola_server` is still the working directory):
```
curl -L https://github.com/jal9o3/ola-web-demo/releases/download/v0.9.9/fivelayer.pth -o fivelayer.pth

curl -L https://github.com/jal9o3/ola-web-demo/releases/download/v0.9.9/fivelayer10k.pth -o fivelayer10k.pth

curl -L https://github.com/jal9o3/ola-web-demo/releases/download/v0.9.9/csd10k.pth -o csd10k.pth

curl -L https://github.com/jal9o3/ola-web-demo/releases/download/v0.9.9/requested20k.pth -o requested20k.pth
```

### Run the backend server
This assumes that the working directory is `backend/ola_server`. Run the
following command:

```
python manage.py runserver
```

### Install the frontend's dependencies
_In another terminal_, set the working directory to the cloned repository and run 
the following commands:
```
cd frontend/GG/gg-app

npm install
```

### Run the frontend server
Run the following command (assumes that the working directory is 
`frontend/GG/gg-app`):

```
npm start
```
The home page should automatically open in your default browser. For the best
experience, set the page to full screen. Enjoy!
