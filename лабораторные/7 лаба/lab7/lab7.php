<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Лабораторная работа №7 - PHP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .task {
            background-color: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .task h2 {
            color: #333;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 10px;
        }
        .result {
            background-color: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #4CAF50;
            margin-top: 10px;
        }
        .calculator {
            display: grid;
            gap: 10px;
            max-width: 400px;
        }
        .calculator input {
            padding: 10px;
            font-size: 16px;
        }
        .calculator button {
            padding: 10px;
            font-size: 16px;
            cursor: pointer;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
        }
        .calculator button:hover {
            background-color: #45a049;
        }
        .file-upload {
            margin-top: 10px;
        }
        .file-upload input[type="file"] {
            margin: 10px 0;
        }
        .file-upload button {
            padding: 10px 20px;
            background-color: #2196F3;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .file-upload button:hover {
            background-color: #0b7dda;
        }
    </style>
</head>
<body>
    <h1>Лабораторная работа №7 - Основы PHP</h1>

    <?php
    // ====================== Задание 1 ======================
    // Рекурсивная функция возведения в степень
    function power($val, $pow) {
        if ($pow == 0) {
            return 1;
        }
        if ($pow < 0) {
            return 1 / power($val, -$pow);
        }
        return $val * power($val, $pow - 1);
    }
    ?>

    <div class="task">
        <h2>Задание 1: Рекурсивное возведение в степень</h2>
        <form method="POST" style="margin-bottom: 15px;">
            <input type="number" name="power_val" placeholder="Число" step="any" value="<?php echo isset($_POST['power_val']) ? htmlspecialchars($_POST['power_val']) : '2'; ?>" style="padding: 8px; margin-right: 10px;">
            <input type="number" name="power_pow" placeholder="Степень" step="any" value="<?php echo isset($_POST['power_pow']) ? htmlspecialchars($_POST['power_pow']) : '3'; ?>" style="padding: 8px; margin-right: 10px;">
            <button type="submit" name="calc_power" style="padding: 8px 15px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">Вычислить</button>
        </form>
        <div class="result">
            <?php
            if (isset($_POST['calc_power'])) {
                $val = $_POST['power_val'];
                $pow = $_POST['power_pow'];
                echo "<strong>Результат:</strong> $val в степени $pow = " . power($val, $pow);
            } else {
                echo "<strong>Примеры:</strong><br>";
                echo "2 в степени 3 = " . power(2, 3) . "<br>";
                echo "5 в степени 4 = " . power(5, 4) . "<br>";
                echo "3 в степени 0 = " . power(3, 0) . "<br>";
                echo "2 в степени -2 = " . power(2, -2);
            }
            ?>
        </div>
    </div>

    <?php
    // ====================== Задание 2 ======================
    // Функция для склонения слов
    function declension($number, $forms) {
        $cases = array(2, 0, 1, 1, 1, 2);
        return $forms[($number % 100 > 4 && $number % 100 < 20) ? 2 : $cases[min($number % 10, 5)]];
    }

    function getCurrentTime() {
        $hours = date('G');
        $minutes = date('i');
        
        $hour_forms = array('час', 'часа', 'часов');
        $minute_forms = array('минута', 'минуты', 'минут');
        
        $hours_word = declension($hours, $hour_forms);
        $minutes_word = declension($minutes, $minute_forms);
        
        return "$hours $hours_word $minutes $minutes_word";
    }
    ?>

    <div class="task">
        <h2>Задание 2: Текущее время с правильными склонениями</h2>
        <div class="result">
            <?php echo "Текущее время: " . getCurrentTime(); ?>
        </div>
    </div>

    <?php
    // ====================== Задание 3 ======================
    ?>
    <div class="task">
        <h2>Задание 3: Числа от 0 до 100, делящиеся на 3 (цикл while)</h2>
        <div class="result">
            <?php
            $i = 0;
            $numbers = array();
            while ($i <= 100) {
                if ($i % 3 == 0) {
                    $numbers[] = $i;
                }
                $i++;
            }
            echo implode(', ', $numbers);
            ?>
        </div>
    </div>

    <?php
    // ====================== Задание 4 ======================
    ?>
    <div class="task">
        <h2>Задание 4: Числа от 0 до 10 с описанием (цикл do-while)</h2>
        <div class="result">
            <?php
            function describeNumbers() {
                $i = 0;
                do {
                    if ($i == 0) {
                        echo "$i – это ноль<br>";
                    } elseif ($i % 2 == 0) {
                        echo "$i – четное число<br>";
                    } else {
                        echo "$i – нечетное число<br>";
                    }
                    $i++;
                } while ($i <= 10);
            }
            describeNumbers();
            ?>
        </div>
    </div>

    <?php
    // ====================== Задание 5 ======================
    ?>
    <div class="task">
        <h2>Задание 5: Числа от 0 до 9 (цикл for без тела)</h2>
        <div class="result">
            <?php
            $output = '';
            for($i = 0; $i < 10; $output .= $i . ($i < 9 ? ', ' : ''), $i++);
            echo $output;
            ?>
        </div>
    </div>

    <?php
    // ====================== Задание 6 ======================
    ?>
    <div class="task">
        <h2>Задание 6: Массив областей и городов</h2>
        <div class="result">
            <?php
            $regions = array(
                'Московская область' => array('Москва', 'Зеленоград', 'Клин', 'Коломна', 'Королёв'),
                'Ленинградская область' => array('Санкт-Петербург', 'Всеволожск', 'Павловск', 'Кронштадт', 'Колпино'),
                'Рязанская область' => array('Рязань', 'Касимов', 'Скопин', 'Сасово', 'Кораблино'),
                'Владимирская область' => array('Владимир', 'Ковров', 'Муром', 'Александров', 'Киржач')
            );

            foreach ($regions as $region => $cities) {
                echo "<strong>$region:</strong> " . implode(', ', $cities) . "<br>";
            }
            ?>
        </div>
    </div>

    <?php
    // ====================== Задание 7 ======================
    ?>
    <div class="task">
        <h2>Задание 7: Города, начинающиеся с буквы "К"</h2>
        <div class="result">
            <?php
            foreach ($regions as $region => $cities) {
                $cities_with_k = array();
                foreach ($cities as $city) {
                    if (mb_substr($city, 0, 1) == 'К') {
                        $cities_with_k[] = $city;
                    }
                }
                if (!empty($cities_with_k)) {
                    echo "<strong>$region:</strong> " . implode(', ', $cities_with_k) . "<br>";
                }
            }
            ?>
        </div>
    </div>

    <?php
    // ====================== Задание 8 ======================
    function createTranslitArray() {
        return array(
            'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd',
            'е' => 'e', 'ё' => 'yo', 'ж' => 'zh', 'з' => 'z', 'и' => 'i',
            'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n',
            'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't',
            'у' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'ts', 'ч' => 'ch',
            'ш' => 'sh', 'щ' => 'sch', 'ъ' => '', 'ы' => 'y', 'ь' => '',
            'э' => 'e', 'ю' => 'yu', 'я' => 'ya',
            'А' => 'A', 'Б' => 'B', 'В' => 'V', 'Г' => 'G', 'Д' => 'D',
            'Е' => 'E', 'Ё' => 'Yo', 'Ж' => 'Zh', 'З' => 'Z', 'И' => 'I',
            'Й' => 'Y', 'К' => 'K', 'Л' => 'L', 'М' => 'M', 'Н' => 'N',
            'О' => 'O', 'П' => 'P', 'Р' => 'R', 'С' => 'S', 'Т' => 'T',
            'У' => 'U', 'Ф' => 'F', 'Х' => 'H', 'Ц' => 'Ts', 'Ч' => 'Ch',
            'Ш' => 'Sh', 'Щ' => 'Sch', 'Ъ' => '', 'Ы' => 'Y', 'Ь' => '',
            'Э' => 'E', 'Ю' => 'Yu', 'Я' => 'Ya'
        );
    }

    function transliterate($string) {
        $translit = createTranslitArray();
        return strtr($string, $translit);
    }
    ?>

    <div class="task">
        <h2>Задание 8: Транслитерация строк</h2>
        <form method="POST" style="margin-bottom: 15px;">
            <input type="text" name="translit_text" placeholder="Введите текст на русском" value="<?php echo isset($_POST['translit_text']) ? htmlspecialchars($_POST['translit_text']) : ''; ?>" style="padding: 8px; width: 300px; margin-right: 10px;">
            <button type="submit" name="do_translit" style="padding: 8px 15px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">Транслитерировать</button>
        </form>
        <div class="result">
            <?php
            if (isset($_POST['do_translit']) && !empty($_POST['translit_text'])) {
                $input_text = $_POST['translit_text'];
                echo "<strong>Исходная строка:</strong> " . htmlspecialchars($input_text) . "<br>";
                echo "<strong>Транслитерация:</strong> " . transliterate($input_text);
            } else {
                $test_string = "Привет, мир!";
                echo "<strong>Пример:</strong><br>";
                echo "Исходная строка: $test_string<br>";
                echo "Транслитерация: " . transliterate($test_string);
            }
            ?>
        </div>
    </div>

    <?php
    // ====================== Задание 9 ======================
    function transliterateAndReplace($string) {
        $transliterated = transliterate($string);
        return str_replace(' ', '_', $transliterated);
    }
    ?>

    <div class="task">
        <h2>Задание 9: Транслитерация с заменой пробелов на подчеркивания</h2>
        <form method="POST" style="margin-bottom: 15px;">
            <input type="text" name="translit_replace_text" placeholder="Введите текст на русском" value="<?php echo isset($_POST['translit_replace_text']) ? htmlspecialchars($_POST['translit_replace_text']) : ''; ?>" style="padding: 8px; width: 300px; margin-right: 10px;">
            <button type="submit" name="do_translit_replace" style="padding: 8px 15px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">Преобразовать</button>
        </form>
        <div class="result">
            <?php
            if (isset($_POST['do_translit_replace']) && !empty($_POST['translit_replace_text'])) {
                $input_text = $_POST['translit_replace_text'];
                echo "<strong>Исходная строка:</strong> " . htmlspecialchars($input_text) . "<br>";
                echo "<strong>Результат:</strong> " . transliterateAndReplace($input_text);
            } else {
                $test_string = "Это тестовая строка";
                echo "<strong>Пример:</strong><br>";
                echo "Исходная строка: $test_string<br>";
                echo "Результат: " . transliterateAndReplace($test_string);
            }
            ?>
        </div>
    </div>

    <?php
    // ====================== Задание 10 ======================
    $calc_result = '';
    $num1 = '';
    $num2 = '';
    $operation = '';

    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['calculate'])) {
        $num1 = $_POST['num1'];
        $num2 = $_POST['num2'];
        $operation = $_POST['operation'];
        
        if (is_numeric($num1) && is_numeric($num2)) {
            switch ($operation) {
                case '+':
                    $calc_result = $num1 + $num2;
                    break;
                case '-':
                    $calc_result = $num1 - $num2;
                    break;
                case '*':
                    $calc_result = $num1 * $num2;
                    break;
                case '/':
                    if ($num2 != 0) {
                        $calc_result = $num1 / $num2;
                    } else {
                        $calc_result = 'Ошибка: деление на ноль!';
                    }
                    break;
            }
        } else {
            $calc_result = 'Ошибка: введите числа!';
        }
    }
    ?>

    <div class="task">
        <h2>Задание 10: Калькулятор</h2>
        <form method="POST" class="calculator">
            <input type="text" name="num1" placeholder="Первое число" value="<?php echo htmlspecialchars($num1); ?>" required>
            <input type="text" name="num2" placeholder="Второе число" value="<?php echo htmlspecialchars($num2); ?>" required>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px;">
                <button type="submit" name="operation" value="+">+</button>
                <button type="submit" name="operation" value="-">-</button>
                <button type="submit" name="operation" value="*">×</button>
                <button type="submit" name="operation" value="/">÷</button>
            </div>
            <input type="hidden" name="calculate" value="1">
        </form>
        <?php if ($calc_result !== ''): ?>
            <div class="result">
                <strong>Результат:</strong> <?php echo htmlspecialchars($num1) . ' ' . htmlspecialchars($operation) . ' ' . htmlspecialchars($num2) . ' = ' . htmlspecialchars($calc_result); ?>
            </div>
        <?php endif; ?>
    </div>

    <?php
    // ====================== Задание 11 ======================
    $upload_message = '';
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['uploaded_file'])) {
        $upload_dir = 'uploads/';
        
        // Создаем директорию, если её нет
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }
        
        if ($_FILES['uploaded_file']['error'] == 0) {
            $file_name = basename($_FILES['uploaded_file']['name']);
            $target_file = $upload_dir . $file_name;
            
            if (move_uploaded_file($_FILES['uploaded_file']['tmp_name'], $target_file)) {
                $upload_message = "Файл успешно загружен: <strong>" . htmlspecialchars($file_name) . "</strong>";
            } else {
                $upload_message = "Ошибка при загрузке файла.";
            }
        } else {
            $upload_message = "Ошибка: " . $_FILES['uploaded_file']['error'];
        }
    }
    ?>

    <div class="task">
        <h2>Задание 11: Загрузка файлов на сервер</h2>
        <form method="POST" enctype="multipart/form-data" class="file-upload">
            <input type="file" name="uploaded_file" required>
            <button type="submit">Загрузить файл</button>
        </form>
        <?php if ($upload_message): ?>
            <div class="result">
                <?php echo $upload_message; ?>
            </div>
        <?php endif; ?>
    </div>

</body>
</html>
