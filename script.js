const lightValue = document.getElementById('light-value');
const tempValue = document.getElementById('temp-value');
const humidityValue = document.getElementById('humidity-value');
const lampStatus = document.getElementById('lamp-status');
const acStatus = document.getElementById('ac-status');
const doorState = document.getElementById('door-state');
const alarmStatus = document.getElementById('alarm-status');

const sensors = {
  light: 50,
  temp: 24,
  humidity: 55,
  doorOpen: false,
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function simulateSensors() {
  sensors.light = clamp(sensors.light + (Math.random() * 24 - 12), 0, 100);
  sensors.temp = clamp(sensors.temp + (Math.random() * 3 - 1.5), 10, 40);
  sensors.humidity = clamp(sensors.humidity + (Math.random() * 14 - 7), 0, 100);

  if (Math.random() < 0.25) {
    sensors.doorOpen = !sensors.doorOpen;
  }
}

function updateLight() {
  const value = Math.round(sensors.light);
  lightValue.textContent = value;

  if (value < 40) {
    lampStatus.textContent = 'Ligada';
    lampStatus.style.color = '#16a34a';
  } else {
    lampStatus.textContent = 'Desligada';
    lampStatus.style.color = '#ef4444';
  }
}

function updateTemp() {
  tempValue.textContent = Math.round(sensors.temp);
}

function updateHumidity() {
  humidityValue.textContent = Math.round(sensors.humidity);
}

function updateAcStatus() {
  const temperature = sensors.temp;
  const humidity = sensors.humidity;

  if (temperature > 25 || (humidity < 50 && temperature < 25)) {
    acStatus.textContent = 'Ligado';
    acStatus.style.color = '#0ea5e9';
  } else {
    acStatus.textContent = 'Desligado';
    acStatus.style.color = '#64748b';
  }
}

function updateDoor() {
  doorState.textContent = sensors.doorOpen ? 'Aberta' : 'Fechada';
  alarmStatus.textContent = sensors.doorOpen ? 'Ligado' : 'Desligado';

  doorState.style.color = sensors.doorOpen ? '#f59e0b' : '#0f766e';
  alarmStatus.style.color = sensors.doorOpen ? '#dc2626' : '#16a34a';
}

function monitorSensors() {
  simulateSensors();
  updateLight();
  updateTemp();
  updateHumidity();
  updateAcStatus();
  updateDoor();
}

setInterval(monitorSensors, 750);
monitorSensors();
