# Инструкция по развертыванию Strapi на сервере

## Предварительные требования

1. Node.js 18.x или 20.x
2. PM2 установлен глобально
3. Nginx установлен
4. Достаточно RAM (минимум 2GB)

## 1. Подготовка сервера

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Node.js (если еще не установлен)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Установка PM2 глобально
sudo npm install -g pm2

# Установка Nginx (если еще не установлен)
sudo apt install -y nginx

# Создание директории для проекта
sudo mkdir -p /opt/tulsio/strapi
sudo chown -R $USER:$USER /opt/tulsio
```

## 2. Развертывание проекта

```bash
# Перейти в директорию проекта
cd /opt/tulsio/strapi

# Клонировать проект или загрузить файлы
# git clone <your-repo> .

# Установить зависимости
npm install --production

# Создать директорию для логов PM2
mkdir -p logs

# Собрать проект
NODE_ENV=production npm run build
```

## 3. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```bash
nano /opt/tulsio/strapi/.env
```

Добавьте необходимые переменные:

```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Admin
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret
API_TOKEN_SALT=your-api-token-salt
APP_KEYS=your-app-key-1,your-app-key-2

# Optional
STRAPI_ADMIN_BACKEND_URL=https://your-domain.com
```

## 4. Запуск PM2

```bash
# Запустить приложение в production режиме
pm2 start ecosystem.config.js --env production

# Сохранить конфигурацию PM2
pm2 save

# Настроить автозапуск при перезагрузке сервера
pm2 startup
# Выполните команду, которую выведет pm2 startup

# Проверить статус
pm2 status
pm2 logs tulsio-strapi
```

## 5. Настройка Nginx

```bash
# Создать директорию для кэша
sudo mkdir -p /var/cache/nginx/strapi
sudo chown -R www-data:www-data /var/cache/nginx/strapi

# Копировать конфигурацию Nginx
sudo cp nginx.conf /etc/nginx/sites-available/strapi

# Отредактировать домен в конфигурации
sudo nano /etc/nginx/sites-available/strapi
# Замените "your-domain.com" на ваш домен

# Создать символическую ссылку
sudo ln -s /etc/nginx/sites-available/strapi /etc/nginx/sites-enabled/

# Удалить дефолтную конфигурацию (опционально)
sudo rm /etc/nginx/sites-enabled/default

# Проверить конфигурацию Nginx
sudo nginx -t

# Перезапустить Nginx
sudo systemctl restart nginx

# Включить автозапуск Nginx
sudo systemctl enable nginx
```

## 6. Установка SSL сертификата через Certbot

```bash
# Установить Certbot
sudo apt install -y certbot python3-certbot-nginx

# Получить SSL сертификат
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Certbot автоматически обновит конфигурацию Nginx

# Проверить автообновление сертификата
sudo certbot renew --dry-run
```

## 7. Настройка файрвола (опционально)

```bash
# Установить UFW если еще не установлен
sudo apt install -y ufw

# Разрешить SSH
sudo ufw allow ssh

# Разрешить HTTP и HTTPS
sudo ufw allow 'Nginx Full'

# Включить файрвол
sudo ufw enable

# Проверить статус
sudo ufw status
```

## Полезные команды PM2

```bash
# Просмотр логов
pm2 logs tulsio-strapi

# Просмотр мониторинга
pm2 monit

# Перезапуск приложения
pm2 restart tulsio-strapi

# Остановка приложения
pm2 stop tulsio-strapi

# Удаление из PM2
pm2 delete tulsio-strapi

# Просмотр информации о процессе
pm2 info tulsio-strapi

# Очистка логов
pm2 flush
```

## Обновление приложения

```bash
cd /opt/tulsio/strapi

# Загрузить обновления
git pull
# или загрузить новые файлы

# Установить зависимости
npm install --production

# Пересобрать проект
NODE_ENV=production npm run build

# Перезапустить PM2
pm2 restart tulsio-strapi
```

## Мониторинг и отладка

```bash
# Просмотр логов Nginx
sudo tail -f /var/log/nginx/strapi-access.log
sudo tail -f /var/log/nginx/strapi-error.log

# Просмотр логов Strapi
pm2 logs tulsio-strapi --lines 100

# Проверка использования ресурсов
pm2 monit
htop
```

## Резервное копирование

```bash
# Создать резервную копию базы данных
cp /opt/tulsio/strapi/.tmp/data.db /opt/tulsio/backups/data.db.$(date +%Y%m%d)

# Создать резервную копию загруженных файлов
tar -czf /opt/tulsio/backups/uploads-$(date +%Y%m%d).tar.gz /opt/tulsio/strapi/public/uploads/

# Настроить автоматическое резервное копирование через cron
crontab -e

# Добавить строку (резервное копирование каждый день в 2:00)
0 2 * * * cp /opt/tulsio/strapi/.tmp/data.db /opt/tulsio/backups/data.db.$(date +\%Y\%m\%d)
```

## Оптимизации

### 1. Nginx Brotli (опционально)

```bash
# Установка модуля Brotli для Nginx
sudo apt install -y libbrotli-dev
# Затем раскомментируйте строки brotli в nginx.conf
```

### 2. Настройка лимитов системы

```bash
# Увеличить лимиты для большего количества соединений
sudo nano /etc/security/limits.conf

# Добавить:
* soft nofile 65536
* hard nofile 65536
```

### 3. Настройка swap (если мало RAM)

```bash
# Создать swap файл на 2GB
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Сделать постоянным
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## Troubleshooting

### Проблема: PM2 не может запустить приложение

```bash
# Проверить логи
pm2 logs tulsio-strapi --err --lines 50

# Проверить права доступа
ls -la /opt/tulsio/strapi

# Попробовать запустить вручную
cd /opt/tulsio/strapi
NODE_ENV=production npm start
```

### Проблема: 502 Bad Gateway в Nginx

```bash
# Проверить, работает ли Strapi
pm2 status
curl http://localhost:1337

# Проверить логи Nginx
sudo tail -f /var/log/nginx/strapi-error.log

# Проверить SELinux (если используется)
sudo setenforce 0
```

### Проблема: Высокое использование памяти

```bash
# Уменьшить количество инстансов PM2
# В ecosystem.config.js изменить:
instances: 2  # вместо 'max'

# Уменьшить лимит памяти Node.js
node_args: '--max-old-space-size=1024'
```
