"use strict";

const API = "https://api.neocrime-group.com";
const copy = {
  uk: {
    wallet: "Гаманець NeoCrime", distance: "Твій пробіг", records: "Показники рейсів",
    day: "День", week: "Тиждень", month: "Місяць", all: "Увесь час",
    metric: "Показник", minimum: "Мінімум", average: "Середнє", maximum: "Максимум",
    total: "Загальний пробіг", monthly: "За місяць", deliveries: "Виконані доставки",
    cancelled: "Скасовані", review: "На перевірці", mass: "Маса вантажу",
    fuel: "Витрачено пального", speed: "Швидкість", damage: "Пошкодження вантажівки",
    driving: "Час за кермом", balance: "Баланс", level: "Рівень", experience: "Досвід", donated: "Внески в банк",
    loadingProfile: "Завантажуємо статистику…", profileFailed: "Не вдалося завантажити статистику. Спробуй оновити статус.",
    discordSignInFailed: "Не вдалося увійти через Discord. Спробуй ще раз або увійди з паролем.",
    manualDiscord: "Відкрити Discord вручну", confirmPassword: "Повтори пароль", passwordMismatch: "Паролі не збігаються.",
    installTitle: "NeoCrime Tracker для Windows", download: "Завантажити установник",
    installPending: "Можеш встановити трекер зараз. Увійти в застосунок можна після схвалення заявки.",
    installActive: "Встанови трекер та увійди з логіном і паролем свого акаунта.",
    registeredActive: "Реєстрацію завершено. Твій акаунт активний.",
    headline: "Твоя дорога. Твій внесок.",
    lead: "Створи акаунт NeoCrime Tracker для рейсів у ETS2 та ATS. Якщо акаунт уже є, увійди й перевір його статус.",
    home: "← На головну", login: "Увійти", register: "Реєстрація", loginTitle: "Вхід до акаунта",
    registerTitle: "Створити акаунт", profileTitle: "Мій акаунт", username: "Логін", password: "Пароль",
    nickname: "Нікнейм", discord: "Підтвердити Discord", cancel: "Скасувати", reconnect: "Змінити Discord",
    discordHelp: "Підтвердь Discord, щоб прив’язати його до свого акаунта трекера.",
    verified: "Discord підтверджено", loginHint: "3–32 символи. Латиниця, цифри, крапка, дефіс і підкреслення.",
    passwordHint: "Щонайменше 8 символів.", submit: "Подати заявку", refresh: "Оновити статус",
    logout: "Вийти", privacy: "Конфіденційність", terms: "Умови",
    pending: "Заявка на розгляді", active: "Акаунт активний", rejected: "Заявку відхилено",
    banned: "Акаунт заблоковано", deleted: "Акаунт видалено", unknown: "Невідомий статус",
    waiting: "Підтвердь Discord у відкритому вікні.", popup: "Браузер заблокував вікно. Скористайся кнопкою «Відкрити Discord вручну».",
    submitted: "Заявку подано. Щойно адміністрація її розгляне, бот повідомить тебе в Discord.",
    network: "Не вдалося підключитися. Спробуй ще раз.", FLOW_EXPIRED: "Час підтвердження сплив. Почни ще раз.",
    verificationFailed: "Не вдалося підтвердити Discord. Почни ще раз.",
    DISCORD_ALREADY_LINKED: "Цей Discord уже прив’язано. Увійди у свій акаунт.",
    INVALID_CREDENTIALS: "Неправильний логін або пароль.", LOGIN_TAKEN: "Цей логін уже зайнято.",
    ACCOUNT_EXISTS: "Логін або Discord уже використовується.", RATE_LIMITED: "Забагато спроб. Спробуй пізніше.",
    INVALID_LOGIN: "Перевір формат логіна.", INVALID_NICKNAME: "Нікнейм має містити від 2 до 40 символів.",
    INVALID_PASSWORD: "Пароль має містити від 8 до 128 символів.", DISCORD_REQUIRED: "Підтвердь Discord і спробуй знову.",
    SESSION_EXPIRED: "Сесія завершилася. Увійди знову.", OAUTH_NOT_CONFIGURED: "Вхід через Discord ще не налаштовано."
  },
  en: {
    wallet: "NeoCrime Wallet", distance: "Your distance", records: "Delivery metrics",
    day: "Day", week: "Week", month: "Month", all: "All time",
    metric: "Metric", minimum: "Minimum", average: "Average", maximum: "Maximum",
    total: "Total distance", monthly: "This month", deliveries: "Completed deliveries",
    cancelled: "Cancelled", review: "Under review", mass: "Cargo weight",
    fuel: "Fuel used", speed: "Speed", damage: "Truck damage",
    driving: "Time driving", balance: "Balance", level: "Level", experience: "Experience", donated: "Bank donations",
    loadingProfile: "Loading statistics…", profileFailed: "Could not load statistics. Try refreshing your status.",
    discordSignInFailed: "Could not sign in through Discord. Try again or sign in with your password.",
    manualDiscord: "Open Discord manually", confirmPassword: "Confirm password", passwordMismatch: "The passwords do not match.",
    installTitle: "NeoCrime Tracker for Windows", download: "Download the installer",
    installPending: "You can install the tracker now. You can sign in to the app after your application is approved.",
    installActive: "Install the tracker and sign in with your account credentials.",
    registeredActive: "Registration complete. Your account is active.",
    headline: "Your road. Your contribution.",
    lead: "Create a NeoCrime Tracker account for ETS2 and ATS. Already have an account? Sign in to check its status.",
    home: "← Back to the website", login: "Sign in", register: "Register", loginTitle: "Sign in to your account",
    registerTitle: "Create your account", profileTitle: "My account", username: "Username", password: "Password",
    nickname: "Nickname", discord: "Verify Discord", cancel: "Cancel", reconnect: "Change Discord account",
    discordHelp: "Verify your Discord account to link it to NeoCrime Tracker.",
    verified: "Discord verified", loginHint: "3–32 characters. Use letters A–Z, digits, periods, hyphens or underscores.",
    passwordHint: "At least 8 characters.", submit: "Submit application", refresh: "Refresh status",
    logout: "Sign out", privacy: "Privacy", terms: "Terms",
    pending: "Application under review", active: "Account active", rejected: "Application declined",
    banned: "Account suspended", deleted: "Account deleted", unknown: "Unknown status",
    waiting: "Complete Discord verification in the open window.", popup: "Your browser blocked the pop-up. Use the Open Discord manually button.",
    submitted: "Application submitted. The bot will notify you in Discord after the team reviews it.",
    network: "Could not reach the tracker server. Try again.", FLOW_EXPIRED: "Verification expired. Please start again.",
    verificationFailed: "Discord verification failed. Please start again.",
    DISCORD_ALREADY_LINKED: "This Discord account is already linked. Sign in to your existing account.",
    INVALID_CREDENTIALS: "Incorrect username or password.", LOGIN_TAKEN: "This username is already taken.",
    ACCOUNT_EXISTS: "The username or Discord account is already in use.", RATE_LIMITED: "Too many attempts. Try again later.",
    INVALID_LOGIN: "Check the username format.", INVALID_NICKNAME: "Your nickname must be 2–40 characters.",
    INVALID_PASSWORD: "Your password must be 8–128 characters.", DISCORD_REQUIRED: "Verify Discord and try again.",
    SESSION_EXPIRED: "Your session expired. Sign in again.", OAUTH_NOT_CONFIGURED: "Discord sign-in is not configured yet."
  }
};

const el = id => document.getElementById(id);
const language = document.documentElement.lang === "en" ? "en" : "uk";
let mode = new URLSearchParams(location.search).get("mode") === "login" ? "login" : "register";
let token = "", account = null, flow = null, identity = null, popup = null;
let authorizationUrl = "";
let verification = 0, verifying = false, busy = false, notice = "";
let period = "week", profileRequest = 0, avatarUrl = "";
const t = key => Object.hasOwn(copy[language], key) ? copy[language][key] : copy[language].network;

function render() {
  document.querySelectorAll("[data-mode]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.mode === mode));
    button.disabled = busy;
  });
  el("modes").hidden = Boolean(account);
  el("login").hidden = Boolean(account) || mode !== "login";
  el("register").hidden = Boolean(account) || mode !== "register";
  el("profile").hidden = !account;
  el("account-title").closest(".tracker-card").classList.toggle("has-account", Boolean(account));
  el("account-title").textContent = t(account ? "profileTitle" : mode === "login" ? "loginTitle" : "registerTitle");
  el("notice").hidden = !notice;
  el("notice").textContent = notice ? t(notice) : "";
  el("notice").dataset.kind = ["submitted", "registeredActive"].includes(notice) ? "success" : "";
  el("verify").hidden = Boolean(identity);
  el("application").hidden = !identity;
  el("cancel").hidden = !verifying;
  el("discord").disabled = verifying || busy;
  el("manual-discord").hidden = !verifying || !authorizationUrl;
  if (authorizationUrl) el("manual-discord").href = authorizationUrl;
  else el("manual-discord").removeAttribute("href");
  el("discord-name").textContent = identity?.discord_username || identity?.discord_id || "";
  document.querySelectorAll("form button,#refresh,#logout").forEach(button => { button.disabled = busy; });
  if (account) {
    const states = ["pending", "active", "rejected", "banned", "deleted"];
    const state = states.includes(account.status) ? account.status : "unknown";
    el("nickname").textContent = account.nickname;
    el("handle").textContent = "@" + account.login;
    el("account-discord").textContent = account.discord_username ? "Discord · " + account.discord_username : "";
    const nextAvatar = /^https:\/\/cdn\.discordapp\.com\//.test(account.avatar_url || "") ? account.avatar_url : "assets/logo.avif";
    if (avatarUrl !== nextAvatar) {
      avatarUrl = nextAvatar;
      el("account-avatar").src = avatarUrl;
    }
    el("account-state").dataset.state = state;
    el("account-state").textContent = t(state);
    el("reason").textContent = state !== "active" ? account.status_reason || "" : "";
    el("reason").hidden = !el("reason").textContent;
    el("install-tracker").hidden = state !== "pending" && state !== "active";
    el("install-detail").textContent = t(state === "active" ? "installActive" : "installPending");
    if (state !== "active") clearProfile();
  } else {
    clearProfile();
  }
}

async function api(path, method, data, prefix = "/tracker/auth") {
  const headers = { Accept: "application/json" };
  if (data !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = "Bearer " + token;
  const response = await fetch(API + prefix + path, {
    method, headers, body: data === undefined ? undefined : JSON.stringify(data),
    credentials: "omit", cache: "no-store", redirect: "error", signal: AbortSignal.timeout(15000)
  });
  const reply = await response.json().catch(() => null);
  if (!response.ok || reply?.status !== "success")
    throw new Error(reply?.code || (response.status === 429 ? "RATE_LIMITED" : "network"));
  return reply;
}

function stopVerification() {
  verification += 1;
  verifying = false;
  flow = null;
  identity = null;
  authorizationUrl = "";
  closePopup();
}

function closePopup() {
  try { if (popup && !popup.closed) popup.close(); } catch { /* Browser separated the popup. */ }
  popup = null;
}

const number = new Intl.NumberFormat(language === "uk" ? "uk-UA" : "en-US", { maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat(language === "uk" ? "uk-UA" : "en-US", { maximumFractionDigits: 1 });
const unit = language === "uk" ? { km: "км", tonne: "т", litre: "л", speed: "км/год", hour: "год" }
  : { km: "km", tonne: "t", litre: "L", speed: "km/h", hour: "h" };

function metricValue(value, suffix = "", divisor = 1, whole = true) {
  if (!Number.isFinite(value)) return "—";
  return (whole ? number : decimal).format(value / divisor) + (suffix ? " " + suffix : "");
}

function fillCards(id, fields) {
  const cards = fields.map(([label, value]) => {
    const card = document.createElement("div");
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    term.textContent = t(label);
    detail.textContent = value;
    card.append(term, detail);
    return card;
  });
  el(id).replaceChildren(...cards);
}

function drawChart(points, range) {
  const svg = el("mileage-chart");
  const total = points.reduce((sum, point) => sum + point.km, 0);
  const maximum = Math.max(1, ...points.map(point => point.km));
  const slot = 678 / Math.max(points.length, 1);
  const width = Math.min(44, slot * .74);
  const date = new Intl.DateTimeFormat(language === "uk" ? "uk-UA" : "en-US", {
    timeZone: "UTC", ...(range === "day" ? { hour: "2-digit", minute: "2-digit" } : { day: "numeric", month: "short" })
  });
  const node = (tag, attrs) => {
    const result = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [name, value] of Object.entries(attrs)) result.setAttribute(name, value);
    return result;
  };
  const bars = points.map((point, index) => {
    const height = Math.max(2, point.km / maximum * 138);
    const bar = node("rect", { x: 11 + index * slot + (slot - width) / 2, y: 153 - height, width, height, rx: 2 });
    const title = node("title", {});
    title.textContent = date.format(point.at * 1000) + " · " + metricValue(point.km, unit.km);
    bar.append(title);
    return bar;
  });
  const labels = [];
  if (points.length) {
    for (const [index, x, align] of [[0, 12, "start"], [points.length - 1, 688, "end"]].slice(0, points.length === 1 ? 1 : 2)) {
      const label = node("text", { x, y: 176, "text-anchor": align });
      label.textContent = date.format(points[index].at * 1000);
      labels.push(label);
    }
  }
  svg.replaceChildren(node("line", { x1: 11, y1: 154, x2: 689, y2: 154 }), ...bars, ...labels);
  const summary = metricValue(total, unit.km) + " · UTC";
  svg.setAttribute("aria-label", t("distance") + " · " + summary);
  el("chart-summary").textContent = summary;
}

function showProfile(data, range) {
  const s = data.stats || {};
  fillCards("cabinet-totals", [
    ["total", metricValue(s.kilometers, unit.km)], ["monthly", metricValue(s.monthly, unit.km)],
    ["deliveries", metricValue(s.deliveries)], ["cancelled", metricValue(s.cancelled)],
    ["review", metricValue(s.review)], ["mass", metricValue(s.cargo_mass_kg, unit.tonne, 1000, false)],
    ["fuel", metricValue(s.fuel_burned_liters, unit.litre)], ["driving", metricValue(s.driving_seconds, unit.hour, 3600, false)]
  ]);
  const wallet = data.economy;
  el("cabinet-wallet").hidden = !wallet;
  if (wallet) {
    const level = wallet.level;
    fillCards("wallet-totals", [
      ["balance", metricValue(wallet.balance, "CC")], ["level", metricValue(level?.level)],
      ["experience", metricValue(wallet.exp, "EXP")],
      ["donated", metricValue(wallet.donated, "CC")]
    ]);
    const progress = el("level-progress");
    progress.hidden = !(level?.next > 0);
    progress.value = (level?.current || 0) / (level?.next || 1) * 100;
    progress.setAttribute("aria-label", t("level") + " · " + metricValue(level?.current) + " / " + metricValue(level?.next, "EXP"));
  }
  const metrics = [
    ["distance_km", "distance", unit.km, 1, true], ["cargo_mass_kg", "mass", unit.tonne, 1000, false],
    ["fuel_liters", "fuel", unit.litre, 1, false], ["speed_kmh", "speed", unit.speed, 1, false],
    ["truck_damage_percent", "damage", "%", 1, true]
  ];
  const rows = [];
  for (const [key, label, suffix, divisor, whole] of metrics) {
    const values = data.metrics?.[key];
    if (!values) continue;
    const row = document.createElement("tr");
    const heading = document.createElement("th");
    heading.scope = "row";
    heading.textContent = t(label);
    row.append(heading);
    for (const field of ["minimum", "average", "maximum"]) {
      const cell = document.createElement("td");
      cell.textContent = metricValue(values[field], suffix, divisor, whole);
      row.append(cell);
    }
    rows.push(row);
  }
  el("metric-rows").replaceChildren(...rows);
  el("cabinet-records").hidden = !rows.length;
  drawChart((data.chart || []).filter(point => Number.isFinite(point.at) && Number.isFinite(point.km)), range);
  el("cabinet-data").hidden = false;
}

function clearProfile() {
  profileRequest++;
  el("cabinet-data").hidden = el("cabinet-status").hidden = true;
}

async function fetchProfile() {
  if (account?.status !== "active") return;
  const current = ++profileRequest;
  const range = period;
  el("cabinet-status").textContent = t("loadingProfile");
  el("cabinet-status").hidden = false;
  try {
    const reply = await api("/profile?period=" + range, "GET", undefined, "/tracker");
    if (current !== profileRequest) return;
    showProfile(reply.data, range);
    el("cabinet-status").hidden = true;
  } catch {
    if (current === profileRequest) el("cabinet-status").textContent = t("profileFailed");
  }
}

function enterCabinet(result) {
  token = result.session_token;
  account = result.user;
  stopVerification();
  render();
  history.replaceState(null, "", "#profile");
  el("account-title").tabIndex = -1;
  el("account-title").focus({ preventScroll: true });
  el("account").scrollIntoView({ block: "start" });
  void fetchProfile();
}

document.querySelectorAll("[data-period]").forEach(button => button.addEventListener("click", () => {
  period = button.dataset.period;
  document.querySelectorAll("[data-period]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
  void fetchProfile();
}));

el("discord").addEventListener("click", async () => {
  stopVerification();
  popup = window.open("about:blank", "_blank", "popup,width=520,height=720");
  if (popup) popup.opener = null;
  const current = verification;
  verifying = true;
  notice = popup ? "waiting" : "popup";
  render();
  try {
    const result = await api("/discord/start", "POST", { language });
    if (current !== verification) return;
    const url = new URL(result.authorization_url);
    if (url.origin !== "https://discord.com" || url.pathname !== "/oauth2/authorize")
      throw new Error("verificationFailed");
    flow = { flow_id: result.flow_id, poll_token: result.poll_token };
    authorizationUrl = url.href;
    try { if (popup && !popup.closed) popup.location.replace(authorizationUrl); }
    catch { closePopup(); notice = "popup"; }
    render();
    const deadline = Number(result.expires_at) * 1000;
    while (current === verification && Date.now() < deadline) {
      await new Promise(resolve => setTimeout(resolve, 1800));
      if (current !== verification) return;
      const status = await api("/discord/status", "POST", flow);
      if (current !== verification) return;
      if (status.flow_status === "ready" && status.identity) {
        let result;
        try { result = await api("/discord/sign-in", "POST", flow); }
        catch (error) {
          throw new Error(error.message === "network" ? "discordSignInFailed" : error.message);
        }
        if (current !== verification) return;
        if (result.linked) {
          enterCabinet(result);
          return;
        }
        identity = status.identity;
        verifying = false;
        closePopup();
        authorizationUrl = "";
        notice = "";
        render();
        el("application").elements.login.focus();
        return;
      }
      if (status.flow_status === "failed") throw new Error("verificationFailed");
    }
    if (current === verification) throw new Error("FLOW_EXPIRED");
  } catch (error) {
    if (current !== verification) return;
    stopVerification();
    notice = error.message;
    render();
  }
});

function resetDiscord() {
  stopVerification();
  el("reg-password").value = el("reg-confirm").value = "";
  notice = "";
  render();
}
el("cancel").addEventListener("click", resetDiscord);
el("reconnect").addEventListener("click", resetDiscord);

async function run(operation) {
  if (busy) return;
  busy = true;
  notice = "";
  render();
  try { await operation(); }
  catch (error) {
    notice = error.message;
    if (notice === "SESSION_EXPIRED") { token = ""; account = null; mode = "login"; }
    if (notice === "FLOW_EXPIRED" || notice === "DISCORD_REQUIRED") stopVerification();
  } finally { busy = false; render(); }
}

for (const [formId, path] of [["login", "/login"], ["application", "/register"]]) {
  const form = el(formId);
  form.addEventListener("submit", event => {
    event.preventDefault();
    const registering = formId === "application";
    if (registering && (!identity || !flow)) return;
    const values = Object.fromEntries(new FormData(form));
    values.login = values.login.trim().toLowerCase();
    if (registering) {
      const confirm = form.elements.confirm_password;
      if (confirm.value !== values.password) {
        confirm.setCustomValidity(t("passwordMismatch"));
        confirm.reportValidity();
        return;
      }
      values.nickname = values.nickname.trim();
      delete values.confirm_password;
    }
    void run(async () => {
      try {
        const result = await api(path, "POST", registering ? { ...values, ...flow } : values);
        enterCabinet(result);
        if (registering) notice = account.status === "active" ? "registeredActive" : "submitted";
        form.reset();
        el("account-title").tabIndex = -1;
        el("account-title").focus();
      } finally {
        form.elements.password.value = "";
        if (registering) form.elements.confirm_password.value = "";
      }
    });
  });
}

el("refresh").addEventListener("click", () => void run(async () => {
  account = (await api("/me", "GET")).user;
  render();
  await fetchProfile();
}));
el("logout").addEventListener("click", () => void run(async () => {
  await api("/logout", "POST");
  token = "";
  account = null;
  mode = "login";
  el("login").reset();
  el("application").reset();
  if (location.hash === "#profile") history.replaceState(null, "", "#account");
}));

document.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => {
  if (mode === button.dataset.mode) return;
  if (verifying) stopVerification();
  mode = button.dataset.mode;
  notice = "";
  render();
}));
el("reg-confirm").addEventListener("input", event => event.currentTarget.setCustomValidity(""));
el("reg-password").addEventListener("input", () => el("reg-confirm").setCustomValidity(""));
document.querySelectorAll("[data-i18n]").forEach(node => { node.textContent = t(node.dataset.i18n); });
render();
