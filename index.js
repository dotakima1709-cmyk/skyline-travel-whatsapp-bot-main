const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Сканируйте QR-код для входа!');
});

client.on('ready', () => {
    console.log('Бот Skyline Travel Club запущен!');
});

client.on('message', async (msg) => {
    const text = msg.body.toLowerCase().trim();

    // 1. Старт / Выбор языка
    if (text === '/start' || text === 'привет' || text === 'hi' || text === 'hallo') {
        await msg.reply(
            "🌍 *Skyline Travel Club*\n\n" +
            "Выберите язык / Select language:\n" +
            "DE | EN | RU | UA | TR | ES | PL | AR\n\n" +
            "Напишите ответным сообщением код языка (например: RU)"
        );
        return;
    }

    // 2. Главное меню
    if (['de', 'en', 'ru', 'ua', 'tr', 'es', 'pl', 'ar'].includes(text)) {
        await msg.reply(
            "🌴 *Главное меню (Main Menu)*\n\n" +
            "1️⃣ Подобрать тур (BER)\n" +
            "2️⃣ Горящие туры\n" +
            "3️⃣ Запись в офис\n" +
            "4️⃣ Связь с менеджером"
        );
        return;
    }

    // Ветка 1: Подобрать тур
    if (text === '1') {
        await msg.reply(
            "✈️ *Шаг 1: Куда хотите поехать?*\n\n" +
            "Напишите страну (например: Египет, Испания, Турция):"
        );
        return;
    }

    // Ветка 2: Горящие туры
    if (text === '2') {
        await msg.reply(
            "🔥 *Горящие туры:*\n\n" +
            "• Египет (от 480€)\n" +
            "• Турция (от 400€)\n" +
            "• Греция (от 450€)\n\n" +
            "Напишите название страны для детальной карточки."
        );
        return;
    }

    // Ветка 3: Запись в офис
    if (text === '3') {
        await msg.reply(
            "📍 *Наш офис в Берлине:*\n" +
            "Адрес: Friedrichstr. 120\n" +
            "Время работы: Пн-Сб 10:00 - 19:00\n\n" +
            "🔗 *Запись через Appointlet:*\nhttps://appointlet.com"
        );
        return;
    }

    // Ветка 4: Связь с менеджером
    if (text === '4') {
        await msg.reply(
            "👨‍💼 Автоответчик приостановлен на 24 часа.\n" +
            "Оператор уведомлен и ответит вам в ближайшее время!"
        );
        return;
    }
});

client.initialize();