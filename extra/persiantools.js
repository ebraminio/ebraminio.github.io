var persianTools = (function () {
	'use strict';
	
	var persianGlyphs, persianDigits, arabicIndicDigits, arabicDigits,
		vowels, persianCharacters, persianCharactersNoVowels, persianPastVerbs,
		persianPresentVerbs, persianComplexPastVerbs, persianComplexPresentVerbs, similarPersianCharacters, hamza;

	arabicDigits = '0123456789';
	arabicIndicDigits = '٠١٢٣٤٥٦٧٨٩';
	//نویسه\u200cهای غیرفارسی ي-ك-ە و موارد مشابه پیش از تبدیل به نویسهٔ فارسی در سایر ریجکس\u200cها باید به عنوان کاراکتر فارسی شناخته شوند.
	similarPersianCharacters = '\u0643\uFB91\uFB90\uFB8F\uFB8E\uFEDC\uFEDB\uFEDA\uFED9\u0649\uFEEF\u064A\u06C1\u06D5\u06BE\uFEF0-\uFEF4';
	vowels = '\u064B-\u0650\u0652\u0670';
	persianCharacters = '\u0621-\u0655\u067E\u0686\u0698\u06AF\u06A9\u0643\u06AA\uFED9\uFEDA\u06CC\uFEF1\uFEF2' + similarPersianCharacters;
	persianCharactersNoVowels = '\u0621-\u064A\u0653-\u0655\u067E\u0686\u0698\u06AF\u06A9\u0643\u06AA\uFED9\uFEDA\u06CC\uFEF1\uFEF2' + similarPersianCharacters;
	persianDigits = '۰۱۲۳۴۵۶۷۸۹';
	hamza = '\u0654';

	function normalizeZwnj(text) {
		return text
			// Replace LRM، RLM characters with ZWNJ and it will remove unneeded ZWNJ at next lines
			// .replace(/[\u180E\u2028\u2029\u202A\u202B\u202C\u202D\u202E\u200F¬]/g, '\u200c')
			.replace(new RegExp('([' + persianCharacters + '] *)[\u200F\u200E]+( *[' + persianCharacters + '])', 'g'), '$1\u200c$2')
			// Remove more than a ZWNJs
			.replace(/([\u200B-\u200D\uFEFF\u200E\u200F]){2,}/g, '$1')
			// Convert ¬ to zwnj in Persian context
			.replace(new RegExp('([' + persianCharacters + '])¬(?=[' + persianCharacters + '])', 'g'), '$1\u200c')
			// Clean ZWNJs after characters that don't conncet to the next letter
			.replace(/([۰-۹0-9إأةؤورزژاآدذ،؛,\:«»\\\/@#$٪×\*\(\)ـ\-=\|ء])\u200c/g, '$1')
			// Clean ZWNJs before and after English characters
			.replace(/[\u200B-\u200D\uFEFF]([\w])/g, '$1')
			.replace(/([\w])[\u200B-\u200D\uFEFF]/g, '$1')
			// Clean ZWNJs before and after Persian characters
			.replace(new RegExp('\[\\u200b\-\\u200d\\uFEFF\]([' + vowels + arabicIndicDigits + persianDigits + hamza+'])','g'), '$1')
			.replace(new RegExp('(['+arabicIndicDigits+'])\[\\u200b\-\\u200d\\uFEFF\]','g'), '$1')
			// Clean ZWNJs after and before punctuation
			.replace(/[\u200B\u200C\uFEFF]([ء\n\s\[\]\.،«»\:\(\)\؛\؟\?\;\$\!\@\-\=\+\\\|])/g, '$1')
			.replace(/([\n\s\[\.،«»\:\(\)\؛\؟\?\;\$\!\@\-\=\+\\\|])[\u200B-\u200D\uFEFF]/g, '$1')
			// Clean ZWNJs before brakets which have sapce after\before them
			.replace(/[\u200B-\u200D\uFEFF](\]\][\s\n])/g, '$1')
			.replace(/([\n\s]\[\[)[\u200B-\u200D\uFEFF]/g, '$1');
	}

	persianGlyphs = {
		// these two are for visually available ZWNJ #visualZwnj
		'\u200cه': 'ﻫ',
		'ی\u200c': 'ﻰﻲ',
		'أ': 'ﺄﺃﺃ',
		'آ': 'ﺁﺁﺂ',
		'إ': 'ﺇﺈﺇ',
		'ا': 'ﺍﺎ',
		'ب': 'ﺏﺐﺑﺒ',
		'پ': 'ﭖﭗﭘﭙ',
		'ت': 'ﺕﺖﺗﺘ',
		'ث': 'ﺙﺚﺛﺜ',
		'ج': 'ﺝﺞﺟﺠ',
		'چ': 'ﭺﭻﭼﭽ',
		'ح': 'ﺡﺢﺣﺤ',
		'خ': 'ﺥﺦﺧﺨ',
		'د': 'ﺩﺪ',
		'ذ': 'ﺫﺬ',
		'ر': 'ﺭﺮ',
		'ز': 'ﺯﺰ',
		'ژ': 'ﮊﮋ',
		'س': 'ﺱﺲﺳﺴ',
		'ش': 'ﺵﺶﺷﺸ',
		'ص': 'ﺹﺺﺻﺼ',
		'ض': 'ﺽﺾﺿﻀ',
		'ط': 'ﻁﻂﻃﻄ',
		'ظ': 'ﻅﻆﻇﻈ',
		'ع': 'ﻉﻊﻋﻌ',
		'غ': 'ﻍﻎﻏﻐ',
		'ف': 'ﻑﻒﻓﻔ',
		'ق': 'ﻕﻖﻗﻘ',
		'ک': 'ﮎﮏﮐﮑﻙﻚﻛﻜ',
		'گ': 'ﮒﮓﮔﮕ',
		'ل': 'ﻝﻞﻟﻠ',
		'م': 'ﻡﻢﻣﻤ',
		'ن': 'ﻥﻦﻧﻨ',
		'ه': 'ﻩﻪﻫﻬ',
		'هٔ': 'ﮤﮥ',
		'و': 'ﻭﻮ',
		'ؤ': 'ﺅﺅﺆ',
		'ی': 'ﯼﯽﯾﯿﻯﻰﻱﻲﻳﻴ',
		'ئ': 'ﺉﺊﺋﺌ',
		'لا': 'ﻻﻼ',
		'لإ': 'ﻹﻺ',
		'لأ': 'ﻸﻷ',
		'لآ': 'ﻵﻶ'
	};

	function toStandardPersianCharacters(text) {
		var i;
		for (i in persianGlyphs) {
			if (persianGlyphs.hasOwnProperty(i)) {
				text = text.replace(new RegExp('[' + persianGlyphs[i] + ']', 'g'), i);
			}
		}
		return normalizeZwnj(text) // needed because of #visualZwnj
			.replace(/ك/g, 'ک') // Arabic
			.replace(/ڪ/g, 'ک') // Urdu
			.replace(/ﻙ/g, 'ک') // Pushtu
			.replace(/ﻚ/g, 'ک') // Uyghur
			.replace(/ي/g, 'ی') // Arabic
			.replace(/ى/g, 'ی') // Urdu
			.replace(/ے/g, 'ی') // Urdu
			.replace(/ۍ/g, 'ی') // Pushtu
			.replace(/ې/g, 'ی') // Uyghur
			.replace(/ہ/g, 'ه') // Convert &#x06C1; to &#x0647; ہہہہ to ههه
			.replace(/ە/g, 'ه\u200c') // Kurdish
			.replace(/ھ/g, 'ه'); // Kurdish
	}

	function toPersianDigits(text) {
		var i = 0;
		for (i = 0; i <= 9; i = i + 1) {
			text = text.replace(new RegExp('[' + arabicIndicDigits[i] + arabicDigits[i] + ']', 'g'), persianDigits[i]);
		}
		return text
			.replace(new RegExp('([' + persianDigits + ']) ?%', 'g'), '$1٪')
			.replace(new RegExp('٪([' + persianDigits + ']+(?:[.٬٫][' + persianDigits + ']*)*)', 'g'), '$1٪')
			.replace(new RegExp('([' + persianDigits + '])\\.(?=[' + persianDigits + '])', 'g'), '$1٫') // persian decimal separator
			.replace(new RegExp('([' + persianDigits + '])\\،(?=[' + persianDigits + '])', 'g'), '$1٬'); // جایگزینی جداکننده هزاگان به جای ویرگول در میان اعداد
	}

	function applyOrthography(text) {
		return text
			.replace(/\r/g, '')
			//تمیزکاری autoFormatter.js
			.replace( /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFEFF\u00AD]+/g, '' )
			.replace(/[ \xA0\xAD\u1680\u180E\u2000-\u200D\u2028\u2029\u202F\u205F\u2060\u3000]+\n/g,'\n')
			//تبدیل تب و فاصله نشکن اول خط به هیچ چون مدیاویکی آن را در نظر نمی‌گیرد
			.replace(/\n[\t\u00A0]+/g, '\n')
			//تبدیل انواع فاصله‌ها به فاصله ساده
			.replace(/[\u0020\u0085\u00A0\u180E\u2000-\u200A\u202F\u205F\u3000]/g, ' ')
			.replace(/[\u0085]/g, '')
			//http://kb.mozillazine.org/Network.IDN.blacklist_chars
			.replace(/[\u01C3\uFE15]/g, '!')
			.replace(/[\u0589\u05C3\uA789]/g, ':')
			.replace(/[\u0338\u2044\u2215\u2571\u29F8\u3033\uFF0F]/g, '/')
			.replace(/[\u05F4]/g, '"')
			.replace(/[\u06D4\u0701\uFF0E\uFF61]/g, '.')
			.replace(/\u3014/g, '(')
			.replace(/\u3015/g, ')')
			// جایگزینی ۀ غیراستاندار+حرف بعدی بدون فاصله به ه+همزه+فاصله
			.replace(/[ۂۀ](?![\s\n])/g, 'هٔ ')
			// Replace ه followed by (space|ZWNJ|lrm) follow by ی with هٔ
			.replace(/ه[\u200c\u200e\s]+ی([\s\n])/g, 'هٔ$1')
			// Replace ه followed by (space|ZWNJ|lrm|nothing) follow by ء or with هٔ
			.replace(/ه[\u200c\u200e\s]*[ءٔ]([\s\n])/g, 'هٔ$1')
			// Replace هٓ or single-character ۀ with the standard هٔ
			.replace(/(ۀ|هٓ)/g, 'هٔ')
			// Replace ه followed by ئ or ی, and then by ی, with ه\u200cای, example: خانهئی becomes خانه\u200cای
			.replace(/ه\u200c[ئی]ی/g, 'ه\u200cای')
			// Function for removing incorrect ZWNJs
			.replace(/([\u200c\u200e])([\s\n])/g, '$2')
			.replace(/([\s\n])([\u200c\u200e])/g, '$1')
			//فاصلهٔ پیش از واکه\u200cهای کوتاه اشتباه است و برای جلوگیر از به هم چسبیدن کلمات فاصله و واکه جابجا باید گردند.
			.replace(new RegExp('([' + persianCharacters + vowels + hamza + '])(\\s)([' + vowels + hamza + '])', 'g'), '$1$3$2')
			//واکه\u200cهای کوتاه پشت سرهم نمی\u200cآیند و یک حرف باید بینشان فاصله باشد
			.replace(new RegExp('([' + vowels + hamza + ']){2,}', 'g'), '$1')
			.replace(/ئء/g, 'یء') //two hamzes after each other
			.replace(/أء/g, 'اء') //two hamzes after each other
			.replace(/ؤء/g, 'ؤ') //two hamzes after each other
			//.replace(/وء/g, 'ؤ')//bug on  سوء
			.replace(/سؤ ?استفاده/g, 'سوءاستفاده')//bug on سوءاستفاده و سوء
			.replace(/ و یا /g, ' یا ')// replace «و یا» with «یا»
			//افزودن همزه
			.replace(/درباره (ام|ات|اش|مان|تان|شان|ای)(\s|$)/g, 'درباره‌$1$2')//i برای جلوگیری از باگ احتمالی برای افزودن همزه به درباره
			.replace(/درباره /g, 'دربارهٔ ')
			.replace(new RegExp('صفحه(\\s|)(['+persianDigits+']+)(\\n|\\.|\\,|\\||\\<)', 'g'), 'صفحهٔ $2$3');//[[Special:PermaLink/15326391#افزودن همزه]]
	}

	/**
	 * Replaces Persian characters with Arabic's ones so an Arabic sorter can sort Persian lines
	 */
	function dePersian(text) {
		return text
			.replace(/ی/g, 'ي')
			.replace(/ک/g, 'ك')
			.replace(/گ/g, 'كی')
			.replace(/ژ/g, 'زی')
			.replace(/چ/g, 'جی')
			.replace(/پ/g, 'بی');
	}

	function persianSortText(text) {
		return text.split('\n').sort(function (x, y) {
			var keyX = dePersian(x),
				keyY = dePersian(y);
			if (keyX < keyY) {
				return -1;
			}
			if (keyX > keyY) {
				return 1;
			}
			return 0;
		}).join('\n');
	}

	persianPastVerbs = '(' +
		'ارزید|افتاد|افراشت|افروخت|افزود|افسرد|افشاند|افکند|انباشت|انجامید|انداخت|اندوخت|اندود|اندیشید|انگاشت|انگیخت|انگیزاند|اوباشت|ایستاد' +
		'|آراست|آراماند|آرامید|آرمید|آزرد|آزمود|آسود|آشامید|آشفت|آشوبید|آغازید|آغشت|آفرید|آکند|آگند|آلود|آمد|آمرزید|آموخت|آموزاند' +
		'|آمیخت|آهیخت|آورد|آویخت|باخت|باراند|بارید|بافت|بالید|باوراند|بایست|بخشود|بخشید|برازید|برد|برید|بست|بسود|بسیجید|بلعید' +
		'|بود|بوسید|بویید|بیخت|پاشاند|پاشید|پالود|پایید|پخت|پذیراند|پذیرفت|پراکند|پراند|پرداخت|پرستید|پرسید|پرهیزید|پروراند|پرورد|پرید' +
		'|پژمرد|پژوهید|پسندید|پلاسید|پلکید|پناهید|پنداشت|پوسید|پوشاند|پوشید|پویید|پیچاند|پیچانید|پیچید|پیراست|پیمود|پیوست|تاباند|تابید|تاخت' +
		'|تاراند|تازاند|تازید|تافت|تپاند|تپید|تراشاند|تراشید|تراوید|ترساند|ترسید|ترشید|ترکاند|ترکید|تکاند|تکانید|تنید|توانست|جَست|جُست' +
		'|جست|جنباند|جنبید|جنگید|جهاند|جهید|جوشاند|جوشید|جوید|چاپید|چایید|چپاند|چپید|چراند|چربید|چرخاند|چرخید|چرید|چسباند|چسبید' +
		'|چشاند|چشید|چکاند|چکید|چلاند|چلانید|چمید|چید|خاراند|خارید|خاست|خایید|خراشاند|خراشید|خرامید|خروشید|خرید|خزید|خشکاند' +
		'|خشکید|خفت|خلید|خمید|خنداند|خندانید|خندید|خواباند|خوابانید|خوابید|خواست|خواند|خوراند|خورد|خوفید|خیساند|خیسید|داد|داشت|دانست' +
		'|درخشانید|درخشید|دروید|درید|دزدید|دمید|دواند|دوخت|دوشید|دوید|دید|دیدم|راند|ربود|رخشید|رساند|رسانید|رست|رَست|رُست' +
		'|رسید|رشت|رفت|رُفت|رقصاند|رقصید|رمید|رنجاند|رنجید|رندید|رهاند|رهانید|رهید|روبید|روفت|رویاند|رویید|ریخت|رید|ریسید' +
		'|زاد|زارید|زایید|زد|زدود|زیست|سابید|ساخت|سپارد|سپرد|سپوخت|ستاند|ستد|سترد|ستود|ستیزید|سرایید|سرشت|سرود|سرید' +
		'|سزید|سفت|سگالید|سنجید|سوخت|سود|سوزاند|شاشید|شایست|شتافت|شد|شست|شکافت|شکست|شکفت|شکیفت|شگفت|شمارد|شمرد|شناخت' +
		'|شناساند|شنید|شوراند|شورید|طپید|طلبید|طوفید|غارتید|غرید|غلتاند|غلتانید|غلتید|غلطاند|غلطانید|غلطید|غنود|فرستاد|فرسود|فرمود|فروخت' +
		'|فریفت|فشاند|فشرد|فهماند|فهمید|قاپید|قبولاند|کاست|کاشت|کاوید|کرد|کشاند|کشانید|کشت|کشید|کفت|کفید|کند|کوبید|کوچید' +
		'|کوشید|کوفت|گَزید|گُزید|گایید|گداخت|گذارد|گذاشت|گذراند|گذشت|گرازید|گرایید|گرداند|گردانید|گردید|گرفت|گروید|گریاند|گریخت|گریست' +
		'|گزارد|گزید|گسارد|گستراند|گسترد|گسست|گسیخت|گشت|گشود|گفت|گمارد|گماشت|گنجاند|گنجانید|گنجید|گندید|گوارید|گوزید|لرزاند|لرزید' +
		'|لغزاند|لغزید|لمباند|لمدنی|لمید|لندید|لنگید|لهید|لولید|لیسید|ماسید|مالاند|مالید|ماند|مانست|مرد|مکشید|مکید|مولید|مویید' +
		'|نازید|نالید|نامید|نشاند|نشست|نکوهید|نگاشت|نگریست|نمایاند|نمود|نهاد|نهفت|نواخت|نوردید|نوشاند|نوشت|نوشید|نیوشید|هراسید|هشت' +
		'|ورزید|وزاند|وزید|یارست|یازید|یافت' +
		')';

	persianPresentVerbs = '(' +
		'ارز|افت|افراز|افروز|افزا|افزای|افسر|افشان|افکن|انبار|انباز|انجام|انداز|اندای|اندوز|اندیش|انگار|انگیز|انگیزان' +
		'|اوبار|ایست|آرا|آرام|آرامان|آرای|آزار|آزما|آزمای|آسا|آسای|آشام|آشوب|آغار|آغاز|آفرین|آکن|آگن|آلا|آلای' +
		'|آمرز|آموز|آموزان|آمیز|آهنج|آور|آویز|آی|بار|باران|باز|باش|باف|بال|باوران|بای|باید|بخش|بخشا|بخشای' +
		'|بر|بَر|بُر|براز|بساو|بسیج|بلع|بند|بو|بوس|بوی|بیز|بین|پا|پاش|پاشان|پالا|پالای|پذیر|پذیران' +
		'|پر|پراکن|پران|پرداز|پرس|پرست|پرهیز|پرور|پروران|پز|پژمر|پژوه|پسند|پلاس|پلک|پناه|پندار|پوس|پوش|پوشان' +
		'|پوی|پیچ|پیچان|پیرا|پیرای|پیما|پیمای|پیوند|تاب|تابان|تاران|تاز|تازان|تپ|تپان|تراش|تراشان|تراو|ترس|ترسان' +
		'|ترش|ترک|ترکان|تکان|تن|توان|توپ|جنب|جنبان|جنگ|جه|جهان|جو|جوش|جوشان|جوی|چاپ|چای|چپ|چپان' +
		'|چر|چران|چرب|چرخ|چرخان|چسب|چسبان|چش|چشان|چک|چکان|چل|چلان|چم|چین|خار|خاران|خای|خر|خراش' +
		'|خراشان|خرام|خروش|خز|خشک|خشکان|خل|خم|خند|خندان|خواب|خوابان|خوان|خواه|خور|خوران|خوف|خیز|خیس' +
		'|خیسان|دار|درخش|درخشان|درو|دزد|دم|ده|دو|دوان|دوز|دوش|ران|ربا|ربای|رخش|رس|رسان' +
		'|رشت|رقص|رقصان|رم|رنج|رنجان|رند|ره|رهان|رو|روب|روی|رویان|ریز|ریس|رین|زا|زار|زای|زدا' +
		'|زدای|زن|زی|ساب|ساز|سای|سپار|سپر|سپوز|ستا|ستان|ستر|ستیز|سر|سرا|سرای|سرشت|سز|سگال|سنب' +
		'|سنج|سوز|سوزان|شاش|شای|شتاب|شکاف|شکف|شکن|شکوف|شکیب|شمار|شمر|شناس|شناسان|شنو|شو|شور|شوران|شوی' +
		'|طپ|طلب|طوف|غارت|غر|غلت|غلتان|غلط|غلطان|غنو|فرسا|فرسای|فرست|فرما|فرمای|فروش|فریب|فشار|فشان|فشر' +
		'|فهم|فهمان|قاپ|قبولان|کار|کاه|کاو|کش|کَش|کُش|کِش|کشان|کف|کن|کوب|کوچ|کوش|گا|گای|گداز' +
		'|گذار|گذر|گذران|گرا|گراز|گرای|گرد|گردان|گرو|گری|گریان|گریز|گز|گزار|گزین|گسار|گستر|گستران|گسل|گشا' +
		'|گشای|گمار|گنج|گنجان|گند|گو|گوار|گوز|گوی|گیر|لرز|لرزان|لغز|لغزان|لم|لمبان|لند|لنگ|له|لول' +
		'|لیس|ماس|مال|مان|مک|مول|موی|میر|ناز|نال|نام|نشان|نشین|نکوه|نگار|نگر|نما|نمای|نمایان|نه' +
		'|نهنب|نواز|نورد|نوش|نوشان|نویس|نیوش|هراس|هست|هل|ورز|وز|وزان|یاب|یار|یاز' +
		')';

	persianComplexPastVerbs={
		'باز':'آفرید|آمد|آموخت|آورد|ایستاد|تابید|جست|خواند|داشت|رساند|ستاند|شمرد|ماند|نمایاند|نهاد|نگریست|پرسید|گذارد'+
			'|گرداند|گردید|گرفت|گشت|گشود|گفت|یافت',
		'در':'بر ?داشت|بر ?گرفت|آمد|آمیخت|آورد|آویخت|افتاد|افکند|انداخت|رفت|ماند|نوردید|کشید|گرفت',//bug: در گذشته 
		'بر':'آشفت|آمد|آورد|افتاد|افراشت|افروخت|افشاند|افکند|انداخت|انگیخت|تاباند|تابید|تافت|تنید|جهید|خاست|خواست|خورد'+
			'|داشت|دمید|شمرد|نهاد|چید|کرد|کشید|گرداند|گردانید|گردید|گزید|گشت|گشود|گمارد|گماشت',
		'فرو':'آمد|خورد|داد|رفت|نشاند|کرد|گذارد|گذاشت',
		'وا':'داشت|رهاند|ماند|نهاد|کرد',
		'ور':'آمد|افتاد|رفت',
		'یاد':'گرفت',
		'پدید':'آورد',
		'پراکنده':'ساخت',
		'زمین':'خورد',
		'گول':'زد',
		'لخت':'کرد'
	}

	persianComplexPresentVerbs={
		'باز':'آفرین|آموز|آور|ایست|تاب|جو|خوان|دار|رس|ستان|شمار|مان|نمایان|نه|نگر|پرس|گذار|گردان|گرد|گشا|گو|گیر|یاب',
		'در':'بر ?دار|بر ?گیر|آمیز|آور|آویز|افت|افکن|انداز|مان|نورد|کش|گذر|گیر',//مشکل با: در روم باستان، در ده 
		'بر':'آشوب|آور|افت|افراز|افروز|افشان|افکن|انداز|انگیز|تابان|تاب|تن|جه|خواه|خور|خیز|دار|دم|شمار|نه|چین|کش|کن'+
			'|گردان|گزین|گشا|گمار',
		//مشکل با : بر گردن
		'فرو':'خور|ده|رو|نشین|کن|گذار',
		'وا':'دار|رهان|مان|نه|کن',
		'ور':'افت|رو',
		'یاد':'گیر',
		'پدید':'آور',
		'پراکنده':'ساز',
		'زمین':'خور',
		'گول':'زن',
		'لخت':'کن'
	}

	function complexVerbsApplyZwnj(text) {
		for (var x in persianComplexPastVerbs) {
			var y = persianComplexPastVerbs[x]
			text = text.replace(new RegExp(
				  '(^|[^' + persianCharacters + '])(' + x + ') ?(می|نمی|)( |\u200c|)(ن|)('
					 + y + ')(م|ی|یم|ید|ند|ه|ن|)($|[^' + persianCharacters + '])', 'g'),
				'$1$2\u200c$3\u200c$5$6$7$8');
		}
		for (var x in persianComplexPresentVerbs) {
			var y = persianComplexPresentVerbs[x]
			text = text.replace(new RegExp(
				  '(^|[^' + persianCharacters + '])(' + x + ') ?(می|نمی|)( |\u200c|)(ن|)('
					 + y + ')(م|ی|د|یم|ید|ند|ن)($|[^' + persianCharacters + '])', 'g'),
				'$1$2\u200c$3\u200c$5$6$7$8');
		}
		return text;
	}

	function applyZwnj(text) {
		text=complexVerbsApplyZwnj(text);
		return normalizeZwnj(text)
			.replace(
				new RegExp('(^|[^' + persianCharacters + '])(می|نمی) ?' + persianPastVerbs +
					'(م|ی|یم|ید|ند|ه|)($|[^' + persianCharacters + '])', 'g'),
				'$1$2\u200c$3$4$5'
			)
			.replace(
				new RegExp('(^|[^' + persianCharacters + '])(می|نمی) ?' + persianPresentVerbs +
					'(م|ی|د|یم|ید|ند)($|[^' + persianCharacters + '])', 'g'),
				'$1$2\u200c$3$4$5'
			)
			// ماضی نقلی
			.replace(
				new RegExp('(^|[^' + persianCharacters + '])(ن|)' + persianPastVerbs +
					'ه (ام|ای|ایم|اید|اند|است)($|[^' + persianCharacters + '])', 'g'),
				'$1$2$3ه\u200c$4$5'
			)
			
			// بن فعل مضارع «دان» جدا آمد چون پسوند «ی» با عبارت «میدانی» تداخل داشت
			.replace(
				new RegExp('(^|[^' + persianCharacters + '])(می|نمی) ?(دان)(م|د|یم|ید|ند)($|[^' + persianCharacters + '])', 'g'),
				'$1$2\u200c$3$4$5'
			)
			// ای «توان» ناقلا!
			.replace(/(\s)(می|نمی) ?توان/g, '$1$2\u200cتوان')
			// چسباندن تمام «ها»ها با فاصلهٔ مجازی
			.replace(/ ها([\]\.،\:»\)\s]|\'{2,3}|\={2,})/g, '\u200cها$1')
			.replace(/ ها(ی|یی|یم|یت|یش|ی?مان|ی?تان|ی?شان)([\]\.،\:»\)\s])/g, '\u200cها$1$2')
			.replace(/هها/g, 'ه‌ها')
			// چسباندن تمام «ترین»ها با فاصلهٔ مجازی
			.replace(/ ترین([\]\.،\:»\)\s]|\'{2,3}|\={2,})/g, '\u200cترین$1')
			// چسباندن تمام «تبار»ها با فاصلهٔ مجازی
			.replace(
				new RegExp('([' + persianCharacters + ']ی) تبار([^' + persianCharacters + '])', 'g'),
				'$1\u200cتبار$2'
			)
			// چسباندن تمام «شناس»ها با فاصلهٔ مجازی
			.replace(
				new RegExp('([' + persianCharacters + ']) شناس(ی?[^' + persianCharacters + '])', 'g'),
				'$1\u200cشناس$2'
			)
			// چسباندن تمام «گیر»ها با فاصلهٔ مجازی
			.replace(
				new RegExp('([' + persianCharacters + ']) گیری([^' + persianCharacters + '])', 'g'),
				'$1\u200cگیری$2'
			)
			// برای حذف علامت ستاره اضافی قبل از عنوان ها
			.replace(/\n\*\s*(\=+.+?\=+\n)/g, '\n$1')
			// عضو علامت های نقل قول تکی از عنوان ها
			.replace(/(\n=+)(.*?)(?:'+)(.*?)(?:'+)(.*?)(=+\n)/g, '$1$2$3$4$5')
			// اول و آخر هم خط اگر فاصلهٔ مجازی باشد، حذف شود
			.replace(/(^\u200c|\u200c$)/mg, '')
			// شناسه ها
			// توجه: «است» تعدماً از شناسه ها حذف شده چون به عنوان فعل مستقل هم کاربرد دارد و در آن موارد باید جدا نوشته شود
			// مثال: «این یک خانه است» که است در آن باید از خانه جدا نوشته شود
			// حروف «ام» و «ای» هم به دلیل تشابه با حرف ندا «اِی» و ام انگلیسی و ای انگلیسی حذف شدند.
			//.replace(new RegExp('ه +(ایم|اید|اند)($|[^' + persianCharacters + '\u200c])', 'g'), 'ه\u200c$1$2')// به بخش ماضی نقلی منتقل شد
			// موارد جزئی دیگر و بی ربط به فاصلهٔ مجازی، باید منتقل شود
			.replace(/ا\sً/g, 'اً')
			// رفع اشکال که\u200cای
			.replace(/ که\u200cای /g, ' که ای ')
			//رفع اشکال میستری (Mystery)
			.replace(/می\u200cستری/g, 'میستری')
			.replace(/ویکیپدیا/g, 'ویکی‌پدیا')
			.replace(new RegExp('می\u200cگوی($|[^' + persianCharacters + '\u200c])', 'g'), 'میگوی$1') // for میگوی دریایی
			.replace(new RegExp('می\u200cدوی($|[^' + persianCharacters + '\u200c])', 'g'), 'میدوی$1');// for [[میدوی (ابهام‌زدایی)]]
	}

	function punctuation(text) {
		return text
			/// سجاوندی غیرفارسی
			.replace(/ː/g, ':') // Replace incorrect : character
			// استفاده از ؟ فارسی
			.replace(new RegExp('([' + persianCharacters + '])[ ]*[?]', 'g'), '$1؟')
			// استفاده از ; فارسی
			.replace(new RegExp('([' + persianCharacters + '])[ ]*[;]', 'g'), '$1؛ ')
			// استفاده از ، فارسی
			.replace(new RegExp('([' + persianCharacters + '])(\]\]|»|)[ ]*[,]', 'g'), '$1$2، ')
			//حذف دو فاصله بعد از سجاوندی
			.replace(/(،|؛|؟|\.)  /g, '$1 ')
			.replace(/\r/g, '')
			// افزودن یا حذف فاصله
			// حذف فاصله‌های تکراری میان واژه‌ها، به جز بین نام پارامتر و علامت مساوی
			.replace(/(. ) +(?=[^= ])/g, '$1')
			//فاصله بعد از سجاوندی به جز ! به دلیل (<!-- و !! در بالای جدول‌ها)
			.replace(/([،\.\؛\؟»])([^\s\.\(\)«»\"\[\]<>\d\w\{\}\|۰۱۲۳۴۵۶۷۸۹\'])/g, '$1 $2')
			// افزودن فاصله به بعد از سجاوندی
			.replace(new RegExp('([' + persianCharacters + ']+|\\]|\\)|»)([؟،؛\\!\\.])([' + persianCharacters +persianDigits + ']+|\\[|\\(|«)', 'g'), '$1$2 $3')
			// حذف فاصله بعد از گیومه، پرانتز، براکت باز
			.replace(/([\(«\[]) /g, '$1')
			// حذف فاصله قبل از گیومه، پرانتز، براکت بسته
			.replace(/ ([\)»\]])/g, '$1')
			// افزودن فاصله قبل از گیومه باز
			.replace(/([^ \(\[\|\r\n>'])(«)/g, '$1 $2')
			.replace(/ +\( +/g, ' (')
			.replace(new RegExp('([' + persianCharacters + ']|\\]|») *\\( *(?=[' + persianCharacters + '])(?!ها\\)|ان\\))', 'g'), '$1 (')
			.replace(new RegExp('([' + persianCharacters + ']) *\\) *(?=[' + persianCharacters + ']|\\[|«)', 'g'), '$1) ')
			// خط جدید
			.replace(/\n\s{1,}\n/g, '\n\n')
			// Removes extra line between two items list
			.replace(/(\n\*.*?)\n+(?=\n\*)/g, '$1')
			// Removes extra line between two items list
			.replace(/(\n#.*?)\n+(?=\n#)/g, '$1')
			// Convert , to ، if there are Persian characters on both sides of it 
			.replace(new RegExp('([' + persianCharacters + ']), ?(?=[' + persianCharacters + "])", 'g'), '$1$2، ')
			// بعد از نقطه‌ویرگول فارسی علامتی قرار نمی‌گیرد
			.replace(/(؛)(([\s]+)?[\.،؛:!؟\-…])/g, '$1')
			// در انتهای پاراگراف نقطه‌ویرگول فارسی نمی‌آید
			.replace(/(؛)(\s|)\n\n/g, '.\n\n')
			// سجاوندی در ابتدای علامت باز قرار نمی‌گیرد
			.replace(/([\(«])[\s]([؛\.،])/g, '$1')
			// ویرگول فارسی
			// بعد از ویرگول فارسی این علامت‌ها قرار نمی‌گیرد
			.replace(/(،)([\s]+)?([،؛!؟\-][\.،؛!؟\-]*|\.(?!\.))/g, '$1')
			// نقطه
			// باید سه نقطه باشد
			.replace(new RegExp('([' + persianCharacters + '])( *)(\\.{3,})', 'g'), '$1$2…')
			.replace(/ \.\.\. /g, ' … ')
			// بعد از نقطه این علایم نمی‌آیند
			.replace(new RegExp('([' + persianCharacters + '])\\.( *[،؛:!؟\\?]+)', 'g'), '$1.')
			// سجاوندی در ابتدای پرانتز و گیومه باز قرار نمی‌گیرد
			.replace(new RegExp('(\\(|«)[\\.،؛](\\s|)([' + persianCharacters + '])', 'g'), '$1$3')
			// سجاوندی در داخل پرانتز
			.replace(new RegExp('([' + persianCharacters + '])(\\s|)[\\.،؛](\\s|)(\\))', 'g'), '$1$2$3$4')
			// در صورت وابستگی معنی جملات بهتر است نقطه‌ویرگول فارسی قرار گیرد
			.replace(new RegExp('([' + persianCharacters + '])(\\s|)(\\.)(\\s|)(ولی|که\\s|و\\s|بنابراین|لذا)', 'g'), '$1؛ $5')
			/// Question & exclamation mark
			// علامت تعجب تکراری به دلیل وجود !! در عنوان جدول‌های مدیاویکی نباید اصلاح شود.
			// تكرار علامت سوال فارسی
			.replace(/(؟(\s|)){2,}/g, '؟')
			// علامت‌گذاری نادرست
			.replace('؟ !', '؟!').replace('! ؟', '!؟')
			// Remove space preceding punctuation, except for ellipses
			.replace(/([^ \.]) +([؟،\:؛!\.])(\s[^ \.]|<|$)/g, '$1$2$3')
			// تبدیل نیم‌خط به تمام خط بین اعداد فارسی (وپ:خط تیره)
			.replace(new RegExp('([' + persianDigits + ']+\\s?(?:\\_\\_|\\-|ـ+)\\s?)*([' + persianDigits + ']+)\\s?(?:\\_\\_|\\-|ـ+)\\s?([' + persianDigits + ']+)(?!\\s?(?:\\_\\_|\\-|ـ+)\\s?[' + persianDigits + ']+)', 'g'), function ($0, $1, $2, $3) { return ($1 ? $0 : $2 + '–' + $3) })
			// عبارت «ها» درون پرانتز می‌تواند به کلمه قبلی خود بچسبد
			.replace(/ \(ها\)/g, '(ها)')
			.replace(/(\(|)ه‍\. (ق|خ|ش)([\n ]|\))/g, 'ه‍.$2$3')//iاصلاح تاریخ هجری
			// حذف فاصلهٔ میان دو عبارت مختصر که دارای نقطهٔ اختصار باشند
			.replace(new RegExp('(\^|\\||\\(|«|\\}|"|\\s|\\*|\\#)(([' + persianCharacters + ']\{1,2\})\\. \?)\{2,6\}', 'g'), function (m) { return m.replace(/\. (.)/g, '.$1'); });
	}
	return {
		applyOrthography: applyOrthography,
		applyZwnj: applyZwnj,
		normalizeZwnj: normalizeZwnj,
		persianSortText: persianSortText,
		punctuation: punctuation,
		toPersianDigits: toPersianDigits,
		toStandardPersianCharacters: toStandardPersianCharacters,
		vowels: vowels,
		persianCharacters: persianCharacters,
		persianCharactersNoVowels: persianCharactersNoVowels
	};
}());