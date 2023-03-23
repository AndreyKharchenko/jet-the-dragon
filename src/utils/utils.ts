export function getIcon(name: string) {
    let icon = '';
    switch (name) {
        case 'Мясо':
            icon = 'jet-beef';
            break;
        case 'Рыба':
            icon = 'jet-fish';
            break;
        case 'Молочные продукты':
            icon = 'jet-egg';
            break;
        case 'Мучные изделия':
            icon = 'jet-flour';
            break;
        case 'Макаронные изделия':
            icon = 'jet-pasta';
            break;
        case 'Бобовые':
            icon = 'jet-beans';
            break;
        case 'Овощи':
            icon = 'jet-vegetables';
            break;
        case 'Фрукты и ягоды':
            icon = 'jet-fruit';
            break;
        case 'Кондитерские изделия':
            icon = 'jet-candy';
            break;
        default:
            icon = 'jet-all-products'
    }

    return icon;
}