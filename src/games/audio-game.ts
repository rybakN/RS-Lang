import { Api } from "../api/api"
import { Word,Filter,AndCondition,UserWordFilter, CreateUserWordResponse, CreateUserWord, StatisticRequestBody } from "../api/typeApi";
import { getRandomNumber, sixtyFourty} from "./sprint-game"
let rightCount = 0;
let wrongCount = 0;
let rightWords = new Set<string>();
let wrongWords = new Set<string>();
let newWords:number = 0;
let learnedWords:number = 0;
let maxInRow:number = 0;
let currentRow:number = 0;
let userWords:CreateUserWordResponse[];
const successAudio = new Audio('audio/success.mp3');
const failAudio = new Audio('audio/fail.mp3');
const levelHolder = `
    <div class="levelHolder">
        <div class="difficultLevel" id="level1">1</div>
        <div class="difficultLevel" id="level2">2</div>
        <div class="difficultLevel" id="level3">3</div>
        <div class="difficultLevel" id="level4">4</div>
        <div class="difficultLevel" id="level5">5</div>
        <div class="difficultLevel" id="level6">6</div>
    </div>
`