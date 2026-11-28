// Display summaries only. This file deliberately contains no handbook content.
window.FOREST = {
  books: [{"id":"kunchongji","title":"昆虫记","author":"让-亨利·法布尔","domain":"生命与自然","grades":["小学","初中"],"subjects":["科学","语文"],"motif":"insect","tone":"sage","intro":"从细微处认识生命，在观察中重新理解熟悉的世界。","question":"一只小小的昆虫，会怎样改变我们看世界的方式？","hasCourse":true,"reading":"以细致观察与生动叙述，连接自然知识和文学表达。"},{"id":"shijing","title":"诗经","author":"","domain":"文明与表达","grades":["小学","初中","高中"],"subjects":["语文","艺术"],"motif":"leaf","tone":"sand","intro":"在草木、风物与诗歌之间，走近古人的日常与情感。","question":"三千年前的人，怎样表达他们的生活？","hasCourse":false,"reading":"从诗歌的语言与意象出发，感受经典中的生活经验。"},{"id":"tiangongkaiwu","title":"天工开物","author":"宋应星","domain":"文明与创造","grades":["初中"],"subjects":["科学","历史"],"motif":"ring","tone":"clay","intro":"从古代工艺走近自然原理，理解知识如何进入创造。","question":"自然的力量，怎样成为人的创造？","hasCourse":false,"reading":"连接技术、生活与文明的观察入口。"},{"id":"wanwujieshu","title":"万物皆数","author":"","domain":"数形与思维","grades":["小学"],"subjects":["数学"],"motif":"geometry","tone":"mint","intro":"沿着数学发展的足迹，发现数与形背后的问题和创造。","question":"数学，为什么会出现在生活的每个角落？","hasCourse":false,"reading":"从数学史与生活问题中寻找理解数形关系的线索。"},{"id":"xiaowangzi","title":"小王子","author":"安托万·德·圣-埃克苏佩里","domain":"文学与成长","grades":["小学","初中"],"subjects":["语文","艺术"],"motif":"star","tone":"gold","intro":"在星球之间旅行，在故事中认识关系、责任与成长。","question":"怎样的关系，让一颗星球变得独一无二？","hasCourse":false,"reading":"通过阅读与表达，讨论爱、责任和人与人的连接。"},{"id":"shangdidangzaizima","title":"上帝掷骰子吗？","author":"曹天元","domain":"科学与发现","grades":["高中"],"subjects":["物理","语文"],"motif":"orbit","tone":"blue","intro":"追随量子物理的探索历程，理解发现与认识的不断修正。","question":"当已有的解释失效，人们怎样继续认识世界？","hasCourse":false,"reading":"从科学史走近物理探索与人的思考。"},{"id":"xiaodaoojingjixue","title":"小岛经济学","author":"","domain":"社会与生活","grades":["高中"],"subjects":["思想政治"],"motif":"wave","tone":"sage","intro":"借助小岛上的故事，开启对经济生活的提问。","question":"一个小岛的选择，怎样影响所有人的生活？","hasCourse":false,"reading":"与《资本论》配对讨论；不将单一作品的观点视为完整解释。"},{"id":"renlequnxingyaoshanshi","title":"人类群星闪耀时","author":"斯蒂芬·茨威格","domain":"文明与历史","grades":["初中","高中"],"subjects":["历史","语文"],"motif":"star","tone":"clay","intro":"从历史中的关键时刻，思考个体选择与时代的关系。","question":"一个人的选择，怎样与时代相遇？","hasCourse":false,"reading":"以历史叙事为入口，讨论人物、情境与选择。"}],
  catalogBooks: [{"id":"book-001","title":"没头脑和不高兴","author":"任溶溶","worldTag":"自我","coreQuestion":"如何成为自己？","reviewPending":false,"gradeLabels":[1],"subjects":["语文","道德与法治"]},{"id":"book-002","title":"一园青菜成了精","author":"周翔","worldTag":"语言艺术","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[1],"subjects":["语文","音乐","美术"]},{"id":"book-003","title":"吃黑夜的大象","author":"白冰","worldTag":"自然","coreQuestion":"如何与自然和技术共处？","reviewPending":false,"gradeLabels":[2],"subjects":["语文","科学","美术"]},{"id":"book-004","title":"团圆","author":"余丽琼、朱成梁","worldTag":"生命","coreQuestion":"如何与他者相处？","reviewPending":false,"gradeLabels":[2],"subjects":["语文","道德与法治","美术"]},{"id":"book-005","title":"声律启蒙","author":"车万育、吴冠中","worldTag":"语言艺术","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[2],"subjects":["语文","音乐"]},{"id":"book-006","title":"窗边的小豆豆","author":"黑柳彻子、岩崎千弘 绘","worldTag":"自我","coreQuestion":"如何成为自己？","reviewPending":true,"gradeLabels":[3],"subjects":["道德与法治","心理健康"]},{"id":"book-007","title":"中国神话故事","author":"袁珂","worldTag":"文明","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[3],"subjects":["语文","道德与法治","美术"]},{"id":"book-008","title":"丰子恺漫画选","author":"丰子恺","worldTag":"语言艺术","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[3],"subjects":["美术","语文","道德与法治"]},{"id":"book-009","title":"山海经译注","author":"周明","worldTag":"文明","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[3],"subjects":["语文","美术"]},{"id":"xiaowangzi","title":"小王子","author":"安托万·德·圣-埃克苏佩里","worldTag":"生命","coreQuestion":"如何与他者相处？","reviewPending":false,"gradeLabels":[4],"subjects":["语文","戏剧"]},{"id":"kunchongji-okumoto","title":"昆虫记（奥本大三郎版）","author":"让-亨利·法布尔；奥本大三郎改写","worldTag":"生命","coreQuestion":"如何认识真相？","reviewPending":false,"classicId":"kunchongji","edition":"奥本大三郎版","audienceLabel":"四年级","gradeLabels":[4],"subjects":["语文","科学"]},{"id":"kunchongji","title":"昆虫记（果麦版）","author":"让-亨利·法布尔","worldTag":"生命","coreQuestion":"如何认识真相？","reviewPending":false,"classicId":"kunchongji","edition":"果麦版","audienceLabel":"七年级起","gradeLabels":[7],"subjects":["生物学","语文"]},{"id":"book-013","title":"居里夫人传","author":"艾芙·居里、左明彻 译","worldTag":"自我","coreQuestion":"如何面对生命与命运？","reviewPending":false,"gradeLabels":[4],"subjects":["语文","科学"]},{"id":"book-014","title":"安徒生童话选","author":"安徒生、叶君健 译","worldTag":"生命","coreQuestion":"如何面对生命与命运？","reviewPending":false,"gradeLabels":[4],"subjects":["语文","戏剧"]},{"id":"book-022","title":"唐诗三百首","author":"蘅塘退士、顾青 编注","worldTag":"语言艺术","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[4],"subjects":["语文","音乐"]},{"id":"book-015","title":"假如给我三天光明","author":"海伦·凯勒、叶敏 译","worldTag":"自我","coreQuestion":"如何面对生命与命运？","reviewPending":false,"gradeLabels":[5],"subjects":["语文","道德与法治"]},{"id":"book-016","title":"哈利·波特系列","author":"J. K. 罗琳、简体中文版由苏农、马爱农、马爱新 译","worldTag":"自我","coreQuestion":"如何成为自己？","reviewPending":false,"gradeLabels":[5],"subjects":["语文","美术"]},{"id":"book-018","title":"中国神话传说","author":"袁珂","worldTag":"文明","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[5],"subjects":["语文","道德与法治"]},{"id":"book-019","title":"天地九重","author":"杨利伟","worldTag":"宇宙","coreQuestion":"人类探索的边界在哪里？","reviewPending":false,"gradeLabels":[5],"subjects":["科学","道德与法治"]},{"id":"wanwujieshu","title":"万物皆数","author":"米卡埃尔·洛奈","worldTag":"宇宙","coreQuestion":"如何认识真相？","reviewPending":false,"gradeLabels":[5],"subjects":["数学","语文","美术"]},{"id":"book-021","title":"海底两万里","author":"儒勒·凡尔纳、赵克非 译","worldTag":"宇宙","coreQuestion":"人类探索的边界在哪里？","reviewPending":false,"gradeLabels":[5],"subjects":["语文","科学"]},{"id":"book-092","title":"小狗钱钱","author":"博多·舍费尔","worldTag":"自我","coreQuestion":"如何成为自己？","reviewPending":true,"gradeLabels":[5],"subjects":["数学","道德与法治","语文"]},{"id":"book-023","title":"夏洛的网（英语）","author":"E. B. 怀特、Garth Williams 插图","worldTag":"生命","coreQuestion":"如何与他者相处？","reviewPending":false,"gradeLabels":[6],"subjects":["英语","科学"]},{"id":"book-024","title":"呼兰河传","author":"萧红","worldTag":"社会","coreQuestion":"权力、财富与公平从何而来？","reviewPending":false,"gradeLabels":[6],"subjects":["语文","道德与法治"]},{"id":"book-025","title":"寂静的春天","author":"蕾切尔·卡森、吕瑞兰、李长生 译","worldTag":"自然","coreQuestion":"如何与自然和技术共处？","reviewPending":false,"gradeLabels":[6],"subjects":["科学","道德与法治"]},{"id":"book-026","title":"西游记","author":"[明]吴承恩、黄肃秋 注释","worldTag":"自我","coreQuestion":"如何成为自己？","reviewPending":false,"gradeLabels":[6],"subjects":["语文","信息科技"]},{"id":"shijing","title":"诗经","author":"佚名、今人注译：余冠英","worldTag":"语言艺术","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[6],"subjects":["语文","音乐","美术"]},{"id":"book-028","title":"格列佛游记","author":"乔纳森·斯威夫特、杨昊成 译","worldTag":"社会","coreQuestion":"权力、财富与公平从何而来？","reviewPending":false,"gradeLabels":[6],"subjects":["语文","道德与法治","信息科技"]},{"id":"book-029","title":"三体","author":"刘慈欣","worldTag":"宇宙","coreQuestion":"人类探索的边界在哪里？","reviewPending":false,"gradeLabels":[6],"subjects":["语文","科学","信息科技"]},{"id":"book-030","title":"纳尼亚传奇","author":"C. S. 刘易斯、米友梅等 译","worldTag":"生命","coreQuestion":"如何面对生命与命运？","reviewPending":false,"coverNote":"译林中文版书影","gradeLabels":[7],"subjects":["英语","戏剧","生物学"]},{"id":"book-031","title":"水浒传","author":"[明]施耐庵著","worldTag":"社会","coreQuestion":"权力、财富与公平从何而来？","reviewPending":false,"gradeLabels":[7],"subjects":["语文","历史","道德与法治"]},{"id":"book-032","title":"古文观止","author":"[清]吴楚材、吴调侯","worldTag":"语言艺术","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[7],"subjects":["语文","历史"]},{"id":"book-034","title":"红星照耀中国","author":"埃德加·斯诺、董乐山 译","worldTag":"社会","coreQuestion":"权力、财富与公平从何而来？","reviewPending":false,"gradeLabels":[7],"subjects":["语文","历史","道德与法治"]},{"id":"book-036","title":"希腊的神话和传说","author":"古斯塔夫·施瓦布、楚图南","worldTag":"文明","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[7],"subjects":["语文","历史","美术"]},{"id":"book-038","title":"苏东坡传","author":"林语堂、张振玉 译","worldTag":"自我","coreQuestion":"如何面对生命与命运？","reviewPending":false,"gradeLabels":[7],"subjects":["语文","历史","音乐"]},{"id":"book-067","title":"论语","author":"杨伯峻","worldTag":"自我","coreQuestion":"如何成为自己？","reviewPending":true,"gradeLabels":[7],"subjects":["语文","思想政治","历史"]},{"id":"book-081","title":"射雕英雄传","author":"金庸","worldTag":"自我","coreQuestion":"如何成为自己？","reviewPending":false,"gradeLabels":[7],"subjects":["语文","历史"]},{"id":"book-037","title":"科学发现纵横谈","author":"王梓坤","worldTag":"宇宙","coreQuestion":"如何认识真相？","reviewPending":false,"gradeLabels":[8],"subjects":["数学","物理","历史"]},{"id":"book-039","title":"史记（选读）","author":"司马迁、王伯祥","worldTag":"文明","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[8],"subjects":["语文","历史","信息科技"]},{"id":"tiangongkaiwu","title":"天工开物","author":"宋应星","worldTag":"文明","coreQuestion":"如何与自然和技术共处？","reviewPending":false,"gradeLabels":[8],"subjects":["历史","物理","化学","生物学"]},{"id":"book-041","title":"世说新语","author":"刘义庆、朱碧莲、沈海波 译注","worldTag":"文明","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[8],"subjects":["语文","历史","美术"]},{"id":"book-044","title":"新月集·飞鸟集","author":"拉宾德拉纳特·泰戈尔、郑振铎","worldTag":"语言艺术","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[8],"subjects":["语文","美术","音乐"]},{"id":"book-045","title":"了不起的盖茨比（英）","author":"F. Scott Fitzgerald","worldTag":"社会","coreQuestion":"权力、财富与公平从何而来？","reviewPending":false,"gradeLabels":[8],"subjects":["英语","道德与法治"]},{"id":"book-046","title":"营造法式","author":"李诫","worldTag":"文明","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[8],"subjects":["历史","数学","美术","劳动"]},{"id":"book-047","title":"安妮日记","author":"安妮·弗兰克","worldTag":"自我","coreQuestion":"如何面对生命与命运？","reviewPending":false,"gradeLabels":[8],"subjects":["语文","历史","道德与法治"]},{"id":"book-048","title":"钢铁是怎样炼成的","author":"尼古拉·奥斯特洛夫斯基、梅益 译","worldTag":"自我","coreQuestion":"如何面对生命与命运？","reviewPending":false,"gradeLabels":[9],"subjects":["语文","历史","道德与法治"]},{"id":"book-049","title":"梦溪笔谈","author":"沈括","worldTag":"宇宙","coreQuestion":"如何认识真相？","reviewPending":false,"gradeLabels":[9],"subjects":["物理","化学","历史","地理"]},{"id":"renlequnxingyaoshanshi","title":"人类的群星闪耀时","author":"斯蒂芬·茨威格","worldTag":"文明","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[9],"subjects":["语文","历史","戏剧"]},{"id":"book-052","title":"苏菲的世界","author":"乔斯坦·贾德、萧宝森 译","worldTag":"自我","coreQuestion":"如何认识真相？","reviewPending":false,"gradeLabels":[9],"subjects":["道德与法治","语文","历史"]},{"id":"book-053","title":"物理世界奇遇记","author":"乔治·伽莫夫、罗素·斯坦纳德、吴伯泽译","worldTag":"宇宙","coreQuestion":"人类探索的边界在哪里？","reviewPending":false,"gradeLabels":[9],"subjects":["物理","数学","化学"]},{"id":"book-054","title":"雷雨","author":"曹禺","worldTag":"生命","coreQuestion":"如何与他者相处？","reviewPending":false,"gradeLabels":[9],"subjects":["语文","戏剧","历史"]},{"id":"book-056","title":"别做正常的傻瓜","author":"奚恺元","worldTag":"自我","coreQuestion":"如何认识真相？","reviewPending":false,"gradeLabels":[9],"subjects":["数学","思想政治"]},{"id":"book-058","title":"福尔摩斯探案（英）","author":"阿瑟·柯南·道尔","worldTag":"自我","coreQuestion":"如何认识真相？","reviewPending":false,"gradeLabels":[10],"subjects":["英语","物理","化学","生物学"]},{"id":"book-059","title":"基因的故事","author":"王莉江、苑华毅","worldTag":"生命","coreQuestion":"如何认识真相？","reviewPending":false,"gradeLabels":[10],"subjects":["生物学","化学","历史"]},{"id":"book-062","title":"变形记","author":"弗兰茨·卡夫卡、叶廷芳等 译","worldTag":"自我","coreQuestion":"如何面对生命与命运？","reviewPending":false,"gradeLabels":[10],"subjects":["语文","心理健康"]},{"id":"xiaodaoojingjixue","title":"小岛经济学","author":"彼得·D. 希夫、安德鲁·J. 希夫、胡晓姣、吕靖纬、陈志超 译","worldTag":"社会","coreQuestion":"权力、财富与公平从何而来？","reviewPending":false,"gradeLabels":[10],"subjects":["思想政治","历史","语文"]},{"id":"book-066","title":"红楼梦","author":"曹雪芹、无名氏 续","worldTag":"生命","coreQuestion":"如何面对生命与命运？","reviewPending":false,"gradeLabels":[10],"subjects":["语文","历史","美术"]},{"id":"book-068","title":"乡土中国","author":"费孝通","worldTag":"社会","coreQuestion":"权力、财富与公平从何而来？","reviewPending":false,"gradeLabels":[10],"subjects":["思想政治","语文","地理"]},{"id":"book-069","title":"人间词话","author":"王国维、叶嘉莹","worldTag":"语言艺术","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[10],"subjects":["语文","美术","生涯教育"]},{"id":"book-071","title":"呐喊","author":"鲁迅","worldTag":"社会","coreQuestion":"权力、财富与公平从何而来？","reviewPending":false,"gradeLabels":[10],"subjects":["语文","历史"]},{"id":"book-090","title":"资本论","author":"卡尔·马克思、第二、三卷由挚友恩格斯整理成书","worldTag":"社会","coreQuestion":"权力、财富与公平从何而来？","reviewPending":true,"gradeLabels":[10],"subjects":["思想政治","历史","语文"]},{"id":"book-091","title":"费马大定理","author":"西蒙·辛格","worldTag":"宇宙","coreQuestion":"如何认识真相？","reviewPending":true,"gradeLabels":[10],"subjects":["数学","信息科技"]},{"id":"book-060","title":"傲慢与偏见（英）","author":"简·奥斯汀、孙致礼 译、王科一译","worldTag":"社会","coreQuestion":"权力、财富与公平从何而来？","reviewPending":false,"coverNote":"译林中文版书影","gradeLabels":[11],"subjects":["英语","信息科技","语文"]},{"id":"book-073","title":"瓦尔登湖","author":"亨利·戴维·梭罗、徐迟 译","worldTag":"自然","coreQuestion":"如何与自然和技术共处？","reviewPending":false,"gradeLabels":[11],"subjects":["语文","生物学","地理"]},{"id":"shangdidangzaizima","title":"上帝掷骰子吗：量子物理史话","author":"曹天元","worldTag":"宇宙","coreQuestion":"如何认识真相？","reviewPending":false,"gradeLabels":[11],"subjects":["物理","语文","生涯教育"]},{"id":"book-078","title":"自然哲学的数学原理","author":"艾萨克·牛顿","worldTag":"宇宙","coreQuestion":"如何认识真相？","reviewPending":false,"gradeLabels":[11],"subjects":["物理","数学","历史"]},{"id":"book-079","title":"共产党宣言","author":"马克思、恩格斯、中共中央马恩列斯著作编译局 译","worldTag":"社会","coreQuestion":"权力、财富与公平从何而来？","reviewPending":false,"gradeLabels":[11],"subjects":["思想政治","历史","语文"]},{"id":"book-080","title":"哈姆雷特","author":"威廉·莎士比亚、朱生豪译","worldTag":"自我","coreQuestion":"如何面对生命与命运？","reviewPending":false,"gradeLabels":[11],"subjects":["语文","戏剧","英语"]},{"id":"book-083","title":"少有人走的路：心智成熟的旅程","author":"M. 斯科特·派克、于海生 译","worldTag":"自我","coreQuestion":"如何成为自己？","reviewPending":false,"gradeLabels":[11],"subjects":["心理健康","生涯教育"]},{"id":"book-084","title":"枪炮、病菌与钢铁：人类社会的命运","author":"贾雷德·戴蒙德、谢延光 译","worldTag":"文明","coreQuestion":"文明如何创造与传承？","reviewPending":false,"gradeLabels":[11],"subjects":["地理","历史","生物学"]},{"id":"book-061","title":"动物庄园","author":"乔治·奥威尔、荣如德译、傅惟慈 译","worldTag":"社会","coreQuestion":"权力、财富与公平从何而来？","reviewPending":false,"gradeLabels":[12],"subjects":["语文","思想政治","历史"]},{"id":"book-075","title":"给青年的十二封信","author":"朱光潜","worldTag":"自我","coreQuestion":"如何成为自己？","reviewPending":false,"gradeLabels":[12],"subjects":["语文","生涯教育","心理健康"]},{"id":"book-085","title":"别闹了，费曼先生（英）","author":"理查德·P. 费曼、拉尔夫·莱顿","worldTag":"自我","coreQuestion":"如何认识真相？","reviewPending":false,"gradeLabels":[12],"subjects":["英语","物理","语文"]},{"id":"book-086","title":"哈萨比斯：谷歌AI之脑","author":"塞巴斯蒂安·马拉比、周健工 译","worldTag":"宇宙","coreQuestion":"人类探索的边界在哪里？","reviewPending":false,"gradeLabels":[12],"subjects":["信息科技","生物学","思想政治","生涯教育"]},{"id":"book-087","title":"平凡的世界","author":"路遥","worldTag":"社会","coreQuestion":"权力、财富与公平从何而来？","reviewPending":false,"gradeLabels":[12],"subjects":["语文","历史","思想政治"]},{"id":"book-088","title":"果壳中的宇宙","author":"史蒂芬·霍金、吴忠超 译","worldTag":"宇宙","coreQuestion":"人类探索的边界在哪里？","reviewPending":false,"gradeLabels":[12],"subjects":["物理","数学","化学"]}],
  courses: {}
};

// The public catalog keeps the primary world tag visible on each card, while
// the approved workbook's world-extension tag also participates in filtering.
// This exposes only the public taxonomy needed by the catalog UI.
window.FOREST.catalogWorldSecondaryTags = {
  '没头脑和不高兴':'社会','一园青菜成了精':'文明','吃黑夜的大象':'自我','团圆':'文明','声律启蒙':'文明',
  '窗边的小豆豆':'社会','中国神话故事':'语言艺术','丰子恺漫画选':'自我','山海经译注':'自然','小王子':'自我',
  '昆虫记（果麦版）':'自然','昆虫记（奥本大三郎版）':'自然','居里夫人传':'宇宙','安徒生童话选':'语言艺术','唐诗三百首':'文明','假如给我三天光明':'生命',
  '哈利·波特系列':'生命','中国神话传说':'语言艺术','天地九重':'自我','万物皆数':'语言艺术','海底两万里':'自然',
  '夏洛的网（英语）':'自我','呼兰河传':'生命','寂静的春天':'社会','西游记':'文明','诗经':'文明',
  '格列佛游记':'自我','三体':'文明','纳尼亚传奇（英）':'自我','水浒传':'自我','古文观止':'文明',
  '红星照耀中国':'文明','希腊的神话和传说':'生命','苏东坡传':'文明','论语':'文明','射雕英雄传':'社会',
  '科学发现纵横谈':'自我','史记（选读）':'社会','天工开物':'自然','世说新语':'语言艺术','新月集·飞鸟集':'生命',
  '了不起的盖茨比（英）':'自我','营造法式':'社会','安妮日记':'社会','钢铁是怎样炼成的':'社会','梦溪笔谈':'文明',
  '人类的群星闪耀时':'自我','苏菲的世界':'宇宙','物理世界奇遇记':'语言艺术','雷雨':'社会','别做正常的傻瓜':'社会',
  '福尔摩斯探案（英）':'社会','基因的故事':'宇宙','变形记':'社会','小岛经济学':'文明','红楼梦':'社会',
  '乡土中国':'文明','人间词话':'自我','呐喊':'自我','资本论':'文明','傲慢与偏见（英）':'生命','瓦尔登湖':'自我',
  '上帝掷骰子吗：量子物理史话':'文明','自然哲学的数学原理':'自然','共产党宣言':'文明','哈姆雷特':'生命',
  '少有人走的路：心智成熟的旅程':'生命','枪炮、病菌与钢铁：人类社会的命运':'自然','动物庄园':'文明','给青年的十二封信':'语言艺术',
  '别闹了，费曼先生（英）':'宇宙','哈萨比斯：谷歌AI之脑':'社会','平凡的世界':'自我','果壳中的宇宙':'自我',
  '费马大定理':'文明','小狗钱钱':'社会'
};
window.FOREST.catalogBooks.forEach(book => {
  const secondary = window.FOREST.catalogWorldSecondaryTags[book.title];
  book.worldTags = [book.worldTag, secondary].filter((tag, index, tags) => tag && tags.indexOf(tag) === index);
});

// Amy's table revisions from 2026-11-24. Keep the display catalog aligned
// with the edited workbook while preserving the frozen batch source verbatim.
(() => {
  const byId = new Map(window.FOREST.catalogBooks.map(book => [book.id, book]));
  Object.assign(byId.get('kunchongji'), {title:'昆虫记'});
  Object.assign(byId.get('book-023'), {title:'夏洛的网（英）', subjects:['英语','道德与法治'], courseIds:['charlotte-my-story']});
  Object.assign(byId.get('book-039'), {title:'史记'});
  Object.assign(byId.get('book-030'), {title:'纳尼亚传奇（英）'});
  Object.assign(byId.get('kunchongji-okumoto'), {subjects:['语文','科学','劳动']});
  Object.assign(byId.get('tiangongkaiwu'), {subjects:['物理','化学','生物学','语文']});
  Object.assign(byId.get('book-058'), {subjects:['英语','物理','化学']});
  Object.assign(byId.get('book-066'), {subjects:['语文','美术']});
  Object.assign(byId.get('book-086'), {subjects:['信息科技','思想政治','生涯教育']});

  const worldTags = window.FOREST.catalogWorldSecondaryTags;
  delete worldTags['昆虫记（果麦版）'];
  delete worldTags['夏洛的网（英语）'];
  delete worldTags['史记（选读）'];
  worldTags['昆虫记'] = '自然';
  worldTags['夏洛的网（英）'] = '自我';
  worldTags['史记'] = '社会';
  window.FOREST.catalogBooks.forEach(book => {
    const secondary = worldTags[book.title];
    book.worldTags = [book.worldTag, secondary].filter((tag, index, tags) => tag && tags.indexOf(tag) === index);
  });
})();

// Local, authorized book images keyed by edition-specific book identity.
window.FOREST.bookCovers = {
  "kunchongji": "assets/catalog-covers/kunchongji.png",
  "xiaowangzi": "大师森林网页版资料/书单图片/小王子.webp",
  "tiangongkaiwu": "大师森林网页版资料/书单图片/天工开物.webp",
  "wanwujieshu": "大师森林网页版资料/书单图片/万物皆数.webp",
  "renlequnxingyaoshanshi": "大师森林网页版资料/书单图片/人类群星闪耀时.webp",
  "shangdidangzaizima": "大师森林网页版资料/书单图片/上帝掷骰子吗.jpg",
  "book-016": "大师森林网页版资料/书单图片/哈利波特.webp",
  "book-032": "大师森林网页版资料/书单图片/古文观止.jpg",
  "book-038": "大师森林网页版资料/书单图片/苏东坡传.webp",
  "book-039": "大师森林网页版资料/书单图片/史记.webp",
  "book-066": "大师森林网页版资料/书单图片/红楼梦.webp",
  "book-078": "大师森林网页版资料/书单图片/自然哲学之数学原理.webp",
  "book-090": "大师森林网页版资料/书单图片/资本论.webp",
  "book-091": "大师森林网页版资料/书单图片/费马大定理.jpg",
  "book-092": "大师森林网页版资料/书单图片/小狗钱钱.webp",
  "book-001": "assets/catalog-covers/book-001.jpeg",
  "book-002": "assets/catalog-covers/book-002.jpeg",
  "book-003": "assets/catalog-covers/book-003.jpeg",
  "book-006": "assets/catalog-covers/book-006.jpeg",
  "kunchongji-okumoto": "assets/catalog-covers/kunchongji-okumoto.jpeg",
  "book-013": "assets/catalog-covers/book-013.jpeg",
  "book-019": "assets/catalog-covers/book-019.jpeg",
  "book-023": "assets/catalog-covers/book-023.jpeg",
  "shijing": "assets/catalog-covers/shijing.jpeg",
  "book-029": "assets/catalog-covers/book-029.jpeg",
  "book-030": "assets/catalog-covers/book-030.jpeg",
  "book-034": "assets/catalog-covers/book-034.jpeg",
  "book-060": "assets/catalog-covers/book-060.jpeg",
  "book-068": "assets/catalog-covers/book-068.jpeg",
  "book-073": "assets/catalog-covers/book-073.jpeg",
  "book-085": "assets/catalog-covers/book-085.jpeg",
  "book-086": "assets/catalog-covers/book-086.jpeg"
};

// Merge the latest frozen public batch without replacing the website taxonomy.
// Existing display labels remain authoritative; batch fields supply public
// introductions, edition notes, author context, and explicit course links.
if (window.FOREST_BATCH_BOOKS?.books?.length) {
  const batchBooks = window.FOREST_BATCH_BOOKS.books.map(book => ({...book,id:book.id==='book-012b'?'kunchongji-okumoto':book.id}));
  const batchById = new Map(batchBooks.map(book => [book.id, book]));
  const legacyAlias = {'book-012b':'kunchongji-okumoto'};
  const current = window.FOREST.catalogBooks
    .filter(book => batchById.has(book.id) && book.id !== 'book-059')
    .map(book => ({...book, ...publicBatchFields(batchById.get(book.id))}));
  const additions = batchBooks
    .filter(book => !current.some(existing => existing.id === book.id) && book.id !== 'book-059')
    .map(book => {
      const legacy = window.FOREST.catalogBooks.find(item => item.id === legacyAlias[book.id]);
      return {
        ...(legacy ? {...legacy, id:book.id} : {
          id:book.id,
          title:book.title,
          author:book.authors.split(/[；，,]/)[0],
          worldTag:worldTagFor(book.subjects),
          coreQuestion:'从一本经典出发，继续追问世界。',
          reviewPending:true,
          gradeLabels:book.gradeLabels,
          subjects:book.subjects
        }),
        ...publicBatchFields(book)
      };
    });
  window.FOREST.catalogBooks = [...current, ...additions];
  // Authorized cover mapping follows the batch merge.
}

function publicBatchFields(book) {
  return {
    batchId: window.FOREST_BATCH_BOOKS.batchId,
    batchTitle: book.title,
    batchAuthors: book.authors,
    edition: book.edition,
    intro: book.intro,
    authorIntro: book.authorIntro,
    spirit: book.spirit,
    courseIds: book.courseIds || [],
    coverAssetId: book.coverAssetId
  };
}

function worldTagFor(subjects) {
  if ((subjects || []).some(subject => ['科学','化学','生物','生物学'].includes(subject))) return '自然';
  if ((subjects || []).some(subject => ['数学','物理'].includes(subject))) return '宇宙';
  if ((subjects || []).some(subject => ['语文','英语'].includes(subject))) return '语言艺术';
  if ((subjects || []).some(subject => ['道德与法治','思想政治'].includes(subject))) return '社会';
  return '文明';
}

Object.assign(window.FOREST.bookCovers,{
  "book-001": "assets/catalog-covers/latest-book-001.jpeg",
  "book-002": "assets/catalog-covers/latest-book-002.jpeg",
  "book-003": "assets/catalog-covers/latest-book-003.jpeg",
  "book-004": "assets/catalog-covers/latest-book-004.jpeg",
  "book-005": "assets/catalog-covers/latest-book-005.jpeg",
  "book-006": "assets/catalog-covers/latest-book-006.jpeg",
  "book-007": "assets/catalog-covers/latest-book-007.jpeg",
  "book-008": "assets/catalog-covers/latest-book-008.jpeg",
  "book-009": "assets/catalog-covers/latest-book-009.jpg",
  "xiaowangzi": "assets/catalog-covers/latest-xiaowangzi.jpg",
  "xiaodaoojingjixue": "assets/catalog-covers/latest-island.jpg",
  "kunchongji-okumoto": "assets/catalog-covers/latest-kunchongji-okumoto.jpeg",
  "book-013": "assets/catalog-covers/latest-book-013.jpeg",
  "book-014": "assets/catalog-covers/latest-book-014.jpeg",
  "book-022": "assets/catalog-covers/latest-book-022.jpeg",
  "book-015": "assets/catalog-covers/latest-book-015.jpeg",
  "book-018": "assets/catalog-covers/latest-book-018.jpeg",
  "book-019": "assets/catalog-covers/latest-book-019.jpeg",
  "book-021": "assets/catalog-covers/latest-book-021.jpeg",
  "book-093": "assets/catalog-covers/latest-book-093.jpeg",
  "book-023": "assets/catalog-covers/latest-book-023.jpeg",
  "book-024": "assets/catalog-covers/latest-book-024.webp",
  "book-025": "assets/catalog-covers/latest-book-025.jpeg",
  "book-026": "assets/catalog-covers/latest-book-026.jpg",
  "shijing": "assets/catalog-covers/shijing-selected-20261128.png",
  "book-028": "assets/catalog-covers/latest-book-028.jpeg",
  "book-029": "assets/catalog-covers/latest-book-029.jpeg",
  "kunchongji": "assets/catalog-covers/insects-secondary-20261128.png",
  "book-030": "assets/catalog-covers/latest-book-030.jpeg",
  "book-031": "assets/catalog-covers/latest-book-031.jpg",
  "book-034": "assets/catalog-covers/latest-book-034.jpeg",
  "book-036": "assets/catalog-covers/latest-book-036.jpeg",
  "book-038": "assets/catalog-covers/latest-book-038.jpeg",
  "book-067": "assets/catalog-covers/latest-book-067.jpeg",
  "book-081": "assets/catalog-covers/latest-book-081.jpeg",
  "book-037": "assets/catalog-covers/latest-book-037.jpeg",
  "book-039": "assets/catalog-covers/latest-book-039.jpeg",
  "book-041": "assets/catalog-covers/latest-book-041.jpeg",
  "book-044": "assets/catalog-covers/latest-book-044.jpg",
  "book-045": "assets/catalog-covers/latest-book-045.jpeg",
  "book-046": "assets/catalog-covers/latest-book-046.jpeg",
  "book-047": "assets/catalog-covers/latest-book-047.jpeg",
  "book-095": "assets/catalog-covers/latest-book-095.jpeg",
  "book-048": "assets/catalog-covers/latest-book-048.jpg",
  "book-049": "assets/catalog-covers/latest-book-049.jpeg",
  "book-052": "assets/catalog-covers/latest-book-052.png",
  "book-053": "assets/catalog-covers/latest-book-053.jpeg",
  "book-054": "assets/catalog-covers/latest-book-054.jpeg",
  "book-056": "assets/catalog-covers/latest-book-056.jpeg",
  "book-058": "assets/catalog-covers/latest-book-058.jpeg",
  "book-062": "assets/catalog-covers/latest-book-062.jpeg",
  "book-068": "assets/catalog-covers/latest-book-068.jpeg",
  "book-069": "assets/catalog-covers/latest-book-069.jpeg",
  "book-071": "assets/catalog-covers/latest-book-071.jpg",
  "book-060": "assets/catalog-covers/latest-book-060.jpeg",
  "book-073": "assets/catalog-covers/latest-book-073.jpeg",
  "book-078": "assets/catalog-covers/latest-book-078.jpeg",
  "book-079": "assets/catalog-covers/latest-book-079.jpeg",
  "book-080": "assets/catalog-covers/latest-book-080.jpeg",
  "book-083": "assets/catalog-covers/latest-book-083.jpeg",
  "book-084": "assets/catalog-covers/latest-book-084.jpeg",
  "book-061": "assets/catalog-covers/latest-book-061.jpeg",
  "book-075": "assets/catalog-covers/latest-book-075.jpeg",
  "book-085": "assets/catalog-covers/latest-book-085.jpeg",
  "book-086": "assets/catalog-covers/latest-book-086.jpeg",
  "book-087": "assets/catalog-covers/latest-book-087.jpg",
  "book-088": "assets/catalog-covers/latest-book-088.jpeg"
});

// Amy's catalog withdrawal, 2026-11-25. Frozen source books remain unchanged.
window.FOREST.catalogBooks = window.FOREST.catalogBooks.filter(book =>
  !(book.gradeLabels || []).includes(1) &&
  (!(book.gradeLabels || []).includes(2) || book.id === 'book-005')
);

// DIRECT-20261126-INFINITY: supplied directly by Amy, independent of frozen batches.
{
  const book = {
    id: 'congyidaowuqiongda',
    title: '从一到无穷大',
    originalTitle: 'One Two Three... Infinity',
    author: '［美］乔治·伽莫夫 著，暴永宁 译，吴伯泽 校',
    gradeLabels: [8],
    subjects: ['物理', '数学', '信息科技'],
    edition: '科学出版社《从一到无穷大：科学中的事实和臆测》，2002年11月，暴永宁译，ISBN 9787030107596，329页，“20世纪科普经典特藏”丛书；豆瓣9.1分 / 14730+人评价（页面快照，非实时）',
    alternativeEdition: '科学出版社2024年纪念版（同译本，ISBN 9787030686466，新增刘兵纪念版序、暴永宁译者回忆与对谈录）；在售更新但评分样本尚未积累（用户提供快照，非实时）',
    spirit: '从一数到无穷大——尺度在变，好奇与推理的方法不变',
    intro: '当今世界最有影响的科普经典名著之一，20世纪70年代末由科学出版社引进出版后在国内影响深远。全书从基本的数学游戏谈起，用生动的比喻讲透爱因斯坦的相对论与四维时空，再深入基本粒子、基因等微观世界，展望太阳系与星系的宏观图景——以“从一到无穷大”为线索，把数学、物理、化学、生物、天文串成一张贯通的科学地图。图文并茂、幽默生动，数十年来启迪了几代人的科学兴趣。',
    authorIntro: '乔治·伽莫夫（1904—1968），美籍俄裔物理学家、天文学家，科普界一代宗师。1928年获列宁格勒大学物理学博士学位，先后师从玻尔、卢瑟福；与勒梅特最早提出宇宙“大爆炸”理论，并首先提出生物学“遗传密码”概念。一生出版25部著作，其中18部为科普作品，1956年获联合国教科文组织卡林伽科普奖。',
    batchId: 'DIRECT-20261126-INFINITY',
    courseIds: []
  };
  const nextGrade = window.FOREST.catalogBooks.findIndex(item => item.gradeLabels?.some(grade => grade > 8));
  window.FOREST.catalogBooks.splice(nextGrade < 0 ? window.FOREST.catalogBooks.length : nextGrade, 0, book);
  window.FOREST.bookCovers[book.id] = '大师森林网页版资料/书单图片/从一到无穷大.jpg';
}

// DIRECT-20261126-ENGLISH-CATALOG; additions from frozen MF-20261126-01.
{
  const additions = [
  {
    "id": "book-097",
    "title": "哈利波特与魔法石（英）",
    "author": "J.K. 罗琳（J.K. Rowling，1965— ） 著",
    "gradeLabels": [
      9
    ],
    "subjects": [
      "英语",
      "戏剧",
      "信息科技"
    ],
    "edition": "Bloomsbury《Harry Potter and the Philosopher's Stone》（英文原版儿童版平装，Jonny Duddle 封面），2014-09，ISBN 9781408855652，342 页（部分渠道标 352 页，系不同印次／精装口径）",
    "intro": "十一岁的哈利·波特寄住在姨妈家的楼梯间，在生日那天收到霍格沃茨魔法学校的录取信，才知道自己是巫师、父母死于伏地魔之手。他在学校里结识罗恩与赫敏，学习魔法、骑上飞天扫帚，并在争夺魔法石的较量中直面伏地魔。本书 1997 年由英国 Bloomsbury 出版，是罗琳的处女作；系列此后被译成 80 余种语言，全球销量逾 5 亿册，被视为当代儿童文学的出版奇迹。",
    "authorIntro": "J.K. 罗琳（J.K. Rowling，1965— ），英国作家。1990 年她在火车上萌生哈利·波特的故事，此后在爱丁堡咖啡馆写作，1997 年出版处女作《哈利·波特与魔法石》。系列据公开报道全球销量逾 5 亿册、译成 80 余种语言，获雀巢聪明豆儿童图书奖等；她另创儿童慈善机构 Lumos。",
    "spirit": "勇气不是没有恐惧，而是在恐惧中仍选择友谊与爱。",
    "courseIds": [],
    "batchId": "MF-20261126-01"
  },
  {
    "id": "book-096",
    "title": "老人与海（英）",
    "author": "欧内斯特·海明威（Ernest Hemingway，1899—1961） 著",
    "gradeLabels": [
      10
    ],
    "subjects": [
      "英语",
      "地理",
      "历史"
    ],
    "edition": "Scribner《The Old Man and the Sea》（英文原版平装，Reissue 重印版），1995-05，ISBN 9780684801223，127 页（Amazon 商品页标 128 页，以编目记录 127 页为准）",
    "intro": "古巴老渔夫圣地亚哥已连续八十四天没有捕到鱼，第八十五天他独自驾船驶向深海，钓上了一条比小船还长的巨型马林鱼。经过两天两夜的殊死搏斗，他终于制服大鱼，却在归途中接连遭到鲨鱼袭击，回港时大鱼只剩骨架。老人虽一无所获，却捍卫了人的尊严——“一个人可以被毁灭，但不能被打败”。本书 1953 年获普利策奖，也是 1954 年诺贝尔奖授奖词特别提及的近著，是海明威“冰山理论”的巅峰之作。",
    "authorIntro": "欧内斯特·海明威（1899—1961），美国作家，“迷惘的一代”代表人物。文风简洁凝练、含蓄深沉，“冰山理论”对 20 世纪文学影响深远。1953 年凭《老人与海》获普利策奖，1954 年获诺贝尔文学奖。代表作《太阳照常升起》《永别了，武器》《丧钟为谁而鸣》。",
    "spirit": "人的尊严不在于胜负，而在于永不屈服的抗争精神。",
    "courseIds": [],
    "batchId": "MF-20261126-01"
  }
];
  window.FOREST.catalogBooks.push(...additions);
  const grades = {"book-023":7,"book-030":8,"book-045":11,"book-060":9};
  for (const book of window.FOREST.catalogBooks) {
    if (grades[book.id]) book.gradeLabels = [grades[book.id]];
    if (book.id === "book-060") {
      book.title = "傲慢与偏见";
      book.subjects = [...new Set(book.subjects.map(subject => subject === "英语" ? "语文" : subject))];
    }
  }
  window.FOREST.catalogBooks = window.FOREST.catalogBooks
    .filter(book => book.id !== "book-058")
    .sort((a,b) => Math.min(...a.gradeLabels) - Math.min(...b.gradeLabels));
}

// DIRECT-20261126-ENGLISH-COVERS: edition-matched images supplied by Amy.
Object.assign(window.FOREST.bookCovers, {
  "book-096": "assets/catalog-covers/latest-book-096.jpg",
  "book-097": "assets/catalog-covers/latest-book-097.jpg"
});

// DIRECT-20261126-COVER-REPLACEMENTS: explicit images selected by Amy.
window.FOREST.bookCovers["book-045"] = "assets/catalog-covers/latest-book-045.jpg";
