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

export function getDeliveryType(name: string | undefined) {
    let status = null;
    if(!!name) {
        switch (name.toUpperCase()) {
            case 'PICKUP':
                status = 'Самовывоз';
                break;
            case 'COURIER':
                status = 'Доставка курьером';
                break;
            default:
                status = 'Самовывоз';
        }
    }
    

    return status;
}

export function getPaymentType(name: string | undefined) {
    let status = null;
    if(!!name) {
        switch (name.toUpperCase()) {
            case 'CASH':
                status = 'Наличными при получении';
                break;
            case 'BANKCARD':
                status = 'Оплата банковской картой онлайн';
                break;
            default:
                status = 'Самовывоз';
        }
    }
    

    return status;
}

export function getImage(id: string) {
    if(!!id) {
        return `https://localhost:7099/images/${id}.png`;
    }

    return `https://localhost:7099/images/default.png`;
    
}

