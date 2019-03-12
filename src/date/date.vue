<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';
import { VMDateState, VMDateDayItem } from './types';
import InputElement from '../input.mixin';
import VueMappButton from '../button/button.vue';
import VueMappIcon from '../icon/icon.vue';
import VueMappMenu from '../menu/menu.vue';
import VueMappInput from '../input/input.vue';
import { pad } from '../helpers/parse';
import date from '.';

const dict = {
  month: [
    ['январь', 'января', 'янв'],
    ['февраль', 'февраля', 'февр'],
    ['март', 'марта', 'март'],
    ['апрель', 'апреля', 'апр'],
    ['май', 'мая', 'май'],
    ['июнь', 'июня', 'июнь'],
    ['июль', 'июля', 'июль'],
    ['август', 'августа', 'авг'],
    ['сентябрь', 'сентября', 'сент'],
    ['октябрь', 'октября', 'окт'],
    ['ноябрь', 'ноября', 'нояб'],
    ['декабрь', 'декабря', 'дек'],
  ],
  weekday: [
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
    'воскресение',
  ],
};

type CompareLevel = 'day' | 'month' | 'year' | 'time';

function toDate(value: string | number | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

function compare(_date1: string | number | Date, _date2: string | number | Date, level: CompareLevel = 'day') {
  if (!_date1 || !_date2) {
    // console.warn('vm-date#compare: 2 arguments expected');
    return;
  }

  const date1 = toDate(_date1);
  const date2 = toDate(_date2);

  const runners = {
    year: () => date1.getFullYear() === date2.getFullYear(),
    month: () => {
      return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth();
    },
    day: () => {
      return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
    }
  };

  return Function.prototype.apply.call(runners[level]);
}

@Component({
  name: 'vm-date',
  model: {
    prop: 'value',
    event: 'select',
  },
  components: {
    'vm-button': VueMappButton,
    'vm-icon': VueMappIcon,
    'vm-menu': VueMappMenu,
    'vm-input': VueMappInput,
  },
  filters: {
    decMonth(val: number) {
      return dict.month[val][1];
    },
    weekday(value: Date) {
      if (!value) return '';

      const jsDay = value.getDay();
      const { weekday } = dict;

      return weekday[jsDay ? jsDay - 1 : weekday.length - 1];
    },
    shortWeekdayNameByIndex(idx: number) {
      return dict.weekday[idx][0];
    },
    pad(value: number | string) {
      return pad(value, 2, '0');
    },
  },
})
export default class VueMappDate extends InputElement {
  state: VMDateState = 'time';
  emitValue: string = '';

  inputYear: number = new Date().getFullYear();
  inputMonth: number = 0;
  inputDay: number = 1;
  inputHours: number = 1;
  inputMinutes: number = 1;

  $refs: {
    years: HTMLDivElement;
    menu: VueMappMenu;
  };

  get fieldValue(): string {
    const { emitValue } = this;

    if (emitValue) {
      return new Date(emitValue).toLocaleDateString();
    } else {
      return '';
    }
  }

  @Prop(String)
  placeholder: string;

  @Prop(String)
  emitFormat: string;

  @Prop(String)
  fieldFormat: string;

  @Prop({
    type: Function,
    default: () => true,
  })
  filter: (date: Date) => any;

  @Prop({
    type: String,
    default: 'day',
  })
  type: string;

  @Prop(Boolean)
  closeOnSelect: boolean;

  @Prop(String)
  fixedState: VMDateState;

  @Prop({
    type: [String, Date],
    default: '1900-01-01',
  })
  startDate: string | Date;

  @Prop({
    type: [String, Date],
    default: '2100-01-01',
  })
  endDate: string | Date;

  @Prop({
    type: String,
    default: 'small',
  })
  view: string;

  @Watch('value')
  updateValue(newValue: string) {
    this.emitValue = newValue;
  }

  get inputDate(): Date {
    return new Date(
      this.inputYear,
      this.inputMonth,
      this.inputDay,
      this.inputHours,
      this.inputMinutes
    );
  }

  get emitValueDate(): Date | null {
    return this.emitValue && new Date(this.emitValue) || null;
  }

  apply() {
    let value: string = '';

    const jd = this.inputDate.toLocaleDateString();

    value = jd.slice(6, 10) + '-' + jd.slice(3, 5);

    if (this.type === 'day') {
      value += '-' + jd.slice(0, 2);
    }

    if (this.emitValue !== value) {
      this.emitValue = value;
      this.$emit('select', this.emitValue);

      if (this.form) {
        this.form.changed = true;
      }
    }

    this.$refs.menu.hide();
  }

  get $_endDate(): Date {
    const { endDate } = this;

    if (typeof endDate === 'string') {
      return new Date(endDate);
    } else {
      return endDate;
    }
  }

  get $_startDate(): Date {
    const { startDate } = this;

    if (typeof startDate === 'string') {
      return new Date(startDate);
    } else {
      return startDate;
    }
  }

  private get toolbarTitle(): string {
    const { state } = this;

    if (state === 'month') {
      return String(this.inputYear);
    }

    if (state === 'time') {
      return `${this.inputDay} ${dict.month[this.inputMonth][1]} ${
        this.inputYear
        }`;
    }

    return `${dict.month[this.inputMonth][0]} ${this.inputYear}`;
  }

  $_filterDate(date) {
    const start = this.$_startDate;
    const end = this.$_endDate;
    const isFirstOfStart =
      date.getMonth() === start.getMonth() &&
      date.getDate() === start.getDate();

    if (!isFirstOfStart && (date < start || date > end)) {
      return false;
    }

    return this.filter(date);
  }

  $_showFooter() {
    return true;
  }

  changeState(state: VMDateState) {
    let allowed = false;

    switch (this.type) {
      case 'day':
        allowed = /year|month|day/.test(state);
        break;
      case 'month':
        allowed = /year|month/.test(state);
        break;
      case 'year':
        allowed = /year/.test(state);
        break;
    }

    if (this.fixedState || !allowed) {
      if (this.closeOnSelect) {
        this.apply();
      }

      return;
    }

    this.state = state;

    if (state === 'year') {
      const { years } = this.$refs;
      const { inputYear } = this;
      const firstYear = years.firstChild;

      if (firstYear) {
        const scrollYearOrder =
          inputYear - parseInt(firstYear.textContent || '0');
        const scrollYearElement = years.children[scrollYearOrder];

        this.$nextTick(() => {
          // @ts-ignore
          const { offsetTop, offsetHeight } = scrollYearElement;

          years.scrollTop =
            offsetTop - years.clientHeight / 2 - offsetHeight / 2;
        });
      }
    }
  }

  get days(): VMDateDayItem[] {
    const maxDaysInViewport: number = 7 * 6;

    const { inputYear, inputMonth } = this;
    const days: VMDateDayItem[] = [];

    const firstDayOfMonth = new Date(inputYear, inputMonth, 1);
    const lastDayOfMonth = new Date(inputYear, inputMonth + 1, 0);
    const prevMonthDaysCount: number = (firstDayOfMonth.getDay() || 7) - 1;

    if (prevMonthDaysCount > 0) {
      for (let i = prevMonthDaysCount; i >= 0; i--) {
        const prevDay = new Date(inputYear, inputMonth, -i);

        days.push({
          key: prevDay.toJSON().slice(0, 10),
          prev: true,
          value: prevDay.getDate(),
          disabled: !this.$_filterDate(prevDay),
          date: prevDay,
        });
      }
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const currentDay = new Date(inputYear, inputMonth, i);

      days.push({
        key: currentDay.toJSON().slice(0, 10),
        value: currentDay.getDate(),
        disabled: !this.$_filterDate(currentDay),
        date: currentDay,
        active: this.emitValue && compare(this.emitValue, currentDay),
        today: compare(new Date(), currentDay),
      });
    }

    const maxNextDays = maxDaysInViewport - days.length;

    for (let i = 1; i <= maxNextDays; i++) {
      const nextDay = new Date(inputYear, inputMonth + 1, i);

      days.push({
        key: nextDay.toJSON().slice(0, 10),
        next: true,
        value: nextDay.getDate(),
        disabled: !this.$_filterDate(nextDay),
        date: new Date(),
      });
    }

    return days;
  }

  get prevStateEnabled(): boolean {
    const { state } = this;
    const start = this.$_startDate;
    const end = this.$_endDate;

    if (state === 'month') {
      return start.getFullYear() !== end.getFullYear();
    }

    if (state === 'day') {
      return (
        start.getFullYear() !== end.getFullYear() ||
        start.getMonth() !== end.getMonth()
      );
    }

    return false;
  }

  get prevArrowEnabled() {
    const { state } = this;
    const startDate = this.$_startDate;

    if (state === 'day') {
      return (
        this.inputYear > startDate.getFullYear() ||
        startDate.getMonth() < this.inputMonth
      );
    }

    if (state === 'month') {
      return startDate.getFullYear() < this.inputYear;
    }

    return true;
  }

  get nextArrowEnabled() {
    const { state } = this;
    const endDate = this.$_endDate;

    if (state === 'day') {
      return (
        this.inputYear < endDate.getFullYear() ||
        endDate.getMonth() > this.inputMonth
      );
    }

    if (state === 'month') {
      return endDate.getFullYear() > this.inputYear;
    }

    return true;
  }

  get months(): object[] {
    const { inputYear } = this;

    const startMonth = this.$_startDate.getMonth();
    const startYear = this.$_startDate.getFullYear();
    const endMonth = this.$_endDate.getMonth();
    const endYear = this.$_endDate.getFullYear();

    return dict.month.map((month, idx) => {
      const monthNum = idx;

      return {
        name: month[2],
        disabled:
          (inputYear === startYear && monthNum < startMonth) ||
          (inputYear === endYear && monthNum > endMonth),
        value: new Date(inputYear, monthNum, 1),
      };
    });
  }

  private nextMonth() {
    if (this.inputMonth < 11) {
      this.inputMonth++;
    } else {
      this.inputMonth = 0;
      this.inputYear++;
    }
  }

  private prevMonth() {
    if (this.inputMonth) {
      this.inputMonth--;
    } else {
      this.inputMonth = 11;
      this.inputYear--;
    }
  }

  private toolbarLeftClick() {
    const { state } = this;

    if (state === 'month') {
      this.inputYear--;
    } else if (state === 'day') {
      this.prevMonth();
    } else if (state === 'time') {
      if (this.inputDay === 1) {
        this.prevMonth();
        this.inputDay = new Date(
          this.inputYear,
          this.inputMonth + 1,
          0
        ).getDate();
      } else {
        this.inputDay--;
      }
    }
  }

  private toolbarRightClick() {
    const { state } = this;

    if (state === 'month') {
      this.inputYear++;
    } else if (state === 'day') {
      this.nextMonth();
    } else if (state === 'time') {
      if (
        this.inputDay ===
        new Date(this.inputYear, this.inputMonth + 1, 0).getDate()
      ) {
        this.nextMonth();
        this.inputDay = 1;
      } else {
        this.inputDay++;
      }
    }
  }

  get years(): number[] {
    const years: number[] = [];
    const startYear = this.$_startDate.getFullYear();
    const endYear = this.$_endDate.getFullYear();

    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }

    return years;
  }

  setYear(year: number) {
    this.inputYear = year;
    this.changeState('month');
  }

  setMonth(monthIdx: number) {
    this.inputMonth = monthIdx;
    this.changeState('day');
  }

  setDay(day: VMDateDayItem) {
    if (day.prev) {
      this.prevMonth();
    } else if (day.next) {
      this.nextMonth();
    }

    this.inputDay = day.value;
    this.changeState('time');
  }

  setDate(_date: string | number) {
    const date = new Date(_date);

    this.inputYear = date.getFullYear();
    this.inputMonth = date.getMonth();
    this.inputDay = date.getDate();
    this.inputMinutes = date.getMinutes();
    this.inputHours = date.getHours();
  }

  prevState() {
    if (!this.prevStateEnabled) return;

    const { state, changeState } = this;

    switch (state) {
      case 'month':
        changeState('year');
        break;
      case 'day':
        changeState('month');
        break;
      case 'time':
        changeState('day');
        break;
    }
  }

  clear() {
    this.now();
    this.emitValue = '';
    this.$emit('select', '');

    if (this.closeOnSelect) {
      this.$refs.menu.hide();
    }
  }

  today() {
    this.now();

    if (this.closeOnSelect) {
      this.apply();
    }
  }

  now() {
    this.setDate(Date.now());
  }

  created() {
    const { value } = this;

    this.state = this.fixedState || this.type;

    if (value) {
      this.emitValue = value;
      this.setDate(value);
    } else {
      this.now();
    }
  }
}
</script>

<template>
  <vm-menu
    ref="menu"
    v-bind="$attrs"
    class="vm-date"
    content-class="vm-date__popup"
  >
    <vm-input
      slot="trigger"
      :label="label"
      :value="fieldValue"
      :placeholder="placeholder"
      :box="box"
      :size="size"
      readonly="readonly"
    >
      <vm-button
        slot="right"
        :disabled="disabled"
        class="vm-date__trigger"
        icon="event"
      />
    </vm-input>
    <div
      v-if="view === 'extended'"
      class="vm-date__header box-primary"
    >
      <div
        :class="{
          'is--active': state === 'year',
          'is--disabled': years.length === 1,
        }"
        @click="changeState('year')"
        class="vm-date__header-year"
      >
        {{ inputYear }}
      </div>
      <div
        v-if="emitValueDate"
        :class="{ 'is--active': /day|month/.test(state) }"
        @click="changeState('day')"
        class="vm-date__header-date"
      >
        <div class="vm-date__header-daymonth">
          <span class="vm-date__header-day">{{ emitValueDate.getDate() }}</span>
          <span class="vm-date__header-month">{{ emitValueDate.getMonth() | decMonth }}</span>
        </div>
        <div class="vm-date__header-weekday">
          {{ emitValueDate | weekday }}
        </div>
      </div>
      <div
        v-if="type === 'time'"
        :class="{ 'is--active': state === 'time' }"
        @click="changeState('time')"
        class="vm-date__header-time"
      >
        <span>{{ inputHours | pad }}</span>
        <span>:</span>
        <span>{{ inputMinutes | pad }}</span>
      </div>
      <vm-button
        @click="today"
        class="vm-date__header-today"
      >
        Сегодня
      </vm-button>
    </div>
    <div class="vm-date__wrapper">
      <div
        v-if="state !== 'year'"
        class="vm-date__toolbar"
      >
        <vm-button
          :class="{ 'vm-date__toolbar-button--hidden': !prevArrowEnabled, }"
          :noshadow="true"
          @click="toolbarLeftClick"
          icon="keyboard_arrow_left"
        />
        <div
          :class="{ 'vm-date__toolbar-title--disabled': !prevStateEnabled }"
          @click="prevState"
          class="vm-date__toolbar-title"
        >
          {{ toolbarTitle }}
        </div>
        <vm-button
          :class="{ 'vm-date__toolbar-button--hidden': !nextArrowEnabled, }"
          :noshadow="true"
          @click="toolbarRightClick"
          icon="keyboard_arrow_right"
        />
      </div>
      <div class="vm-date__content">
        <ul
          ref="years"
          v-show="state === 'year'"
          class="vm-date__years"
        >
          <li
            v-for="year in years"
            :key="year"
            :class="{ 'is--active': year === inputYear }"
            @click="setYear(year)"
            class="vm-date__years-item fill-action"
          >
            {{ year }}
          </li>
        </ul>
        <div
          v-if="state === 'month'"
          class="vm-date__months"
        >
          <vm-button
            v-for="(month, idx) in months"
            :key="id"
            :disabled="month.disabled"
            @click="setMonth(idx)"
          >
            {{ month.name }}
          </vm-button>
        </div>
        <div
          v-if="state === 'day'"
          class="vm-date__days"
        >
          <div class="vm-date__days-weekdays">
            <div
              v-for="idx in [0, 1, 2, 3, 4, 5, 6]"
              class="vm-date__days-weekday"
            >
              {{ idx | shortWeekdayNameByIndex }}
            </div>
          </div>
          <div class="vm-date__days-items">
            <div
              v-for="day in days"
              :key="day.key"
              class="vm-date__day"
            >
              <div
                :data-value="day.key"
                :class="{
                  'is--disabled': day.disabled,
                  'is--outside': day.prev || day.next,
                  'is--active': day.active,
                  'is--now': day.today,
                }"
                @click="setDay(day)"
                class="vm-date__day-wrapper"
              >
                {{ day.value || '' }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="state === 'time'"
          class="vm-date__time"
        >
          <div class="vm-date__time-wrapper">
            <div class="vm-date__time-item">
              {{ inputHours | pad }}
            </div>
            <div class="vm-date__time-div">
              :
            </div>
            <div class="vm-date__time-item">
              {{ inputMinuts | pad }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="$_showFooter"
        class="vm-date__footer"
      >
        <vm-button @click="clear">
          Очистить
        </vm-button>
      </div>
    </div>
  </vm-menu>
</template>

<style lang="scss">
@import 'vars';
@import './theme.scss';

$date-toolbar-height: 56px;
$date-content-height: 240px;

.vm-date {
  &__popup {
    /* width: 460px; */
  }

  &__header {
    position: relative;
    display: none;
    flex: 0 0 auto;
    width: 160px;
    padding: 20px;
    font-weight: 500;

    @media (--sm-view) {
      display: block;
    }

    & > div {
      cursor: pointer;
      opacity: 0.72;

      &.is--active {
        cursor: default;
        opacity: 1;
      }
    }

    &-year,
    &-time {
      font-size: 16px;

      &.is--disabled {
        pointer-events: none;
      }
    }

    &-time {
      margin-top: 20px;

      span:nth-child(2) {
        padding: 0 2px;
      }
    }

    &-date {
      margin-top: 16px;
    }

    &-daymonth {
      margin-top: 12px;
      font-size: 22px;
      line-height: 1.22em;
    }

    &-month {
      margin-left: 8px;
      font-size: 0.8em;

      .vm-date__wrapper[data-vm-state='month'] & {
        cursor: default;
        opacity: 1;
      }
    }

    &-weekday {
      line-height: 32px;
    }
  }

  &__wrapper {
    flex: 1 1 auto;
    width: 300px;
    max-width: 300px;
  }

  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    // box: horizontal right;
    padding: 8px 16px;
  }

  &__toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    // box: horizontal middle;
    height: $date-toolbar-height;
    padding: 0 10px;

    &-title {
      flex: 1 1 auto;
      height: 100%;
      font-weight: 500;
      line-height: $date-toolbar-height;
      text-align: center;
      text-transform: capitalize;
      cursor: pointer;

      &--disabled {
        cursor: default;

        &:hover {
          color: inherit;
        }
      }
    }

    &-button {
      &--hidden {
        visibility: hidden;
      }
    }

    .vm-button {
      flex: 0 0 auto;
      width: 48px !important;
      height: 100%;

      &::after {
        content: none;
      }
    }
  }

  &__years {
    height: calc($date-toolbar-height + $date-content-height);
    padding: 0;
    margin: 0;
    overflow-y: auto;
    list-style-type: none;
    border-style: solid;
    border-width: 0 0 1px;

    &-item {
      position: relative;
      z-index: 1;
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      transition: background .05s cubic-bezier(.25,.8,.25,1);
      will-change: background, color;

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        content: '';
        size: 100%;
      }

      &:hover::after {
        background: rgba(0,0,0,.05);
      }

      &:active::after {
        background: rgba(0,0,0,.08);
      }
      &.is--active {
        height: 64px;
        font-size: 26px;
        font-weight: 500;
        line-height: 64px;
      }
    }
  }

  &__months {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: $date-content-height;
    // box: horizontal wrap;
    padding: 0 16px;
    font-weight: 500;

    button {
      width: 33.3333%;
      margin: 10px 0;
    }

    [disabled] {
      opacity: 0.14;
    }
  }

  &__time {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: calc(100% - $date-toolbar-height);
    // box: horizonatal center middle;

    &-wrapper {
      display: flex;
      flex-direction: row;
      // box: horizontal;
    }

    &-div {
      margin: 0 16px;
      font-size: 40px;
      font-weight: 500;
    }

    &-item {
      font-size: 48px;
    }
  }

  &__day {
    flex-basis: 14.2857142%;
    padding: 2px;
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;

    &-wrapper {
      line-height: 28px;
      cursor: pointer;
      border-radius: 4px;
      size: 100%;
      will-change: opacity;

      &.is--outside {
        opacity: 0.32;

        &:hover {
          opacity: 1;
        }
      }

      &.is--disabled {
        pointer-events: none;
        opacity: 0.14;
      }

      &.is--now {
        position: relative;
        font-weight: 900;
        color: $green-500;

        &.is--active {
          color: $green-100;
        }

        /* &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 2px solid $green-500;
          border-radius: 4px;
        } */
      }
    }
  }

  &__days {
    height: $date-content-height;
    padding: 0 16px 12px;

    &-weekdays {
      display: flex;
      flex: 0 0 100%;
      flex-direction: row;
      // box: horizontal;
      width: 100%;
      margin-bottom: 4px;
      opacity: 0.64;
    }

    &-weekday {
      cursor: default;
    }

    &-item[data-vm-day] {
      position: relative;
      cursor: pointer;
    }

    &-item,
    &-weekday {
      flex-basis: 14.2857142%;
      font-size: 12px;
      font-weight: 500;
      line-height: 32px;
      text-align: center;
      text-transform: uppercase;
    }

    &-item {
      border-radius: 2px;

      &::after {
        content: attr(data-vm-day);
      }

      &.is--now,
      &.is--active {
        position: relative;

        &::after {
          position: absolute;
          top: 2px;
          left: 2px;
          border-radius: 2px;
          size: calc(100% - 4px);
        }
      }

      &.is--now::after {
        border-style: solid;
        border-width: 1px;
      }
    }

    &-items {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      // box: horizontal wrap;
    }
  }

  input {
    cursor: pointer;
  }

  .vm-date__header-today {
    position: absolute;
    bottom: 8px;
    left: 8px;
  }

  .vm-popup__content {
    display: flex;
    flex-direction: row;
    // box: horizontal;
  }

  .vm-input {
    .vm-field & {
      padding-top: 0;
    }
  }
}
</style>

