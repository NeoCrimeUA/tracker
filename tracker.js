"use strict";

const API = "https://api.neocrime.space/tracker/auth";
const copy = {
  uk: {
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
    waiting: "Підтвердь Discord у відкритому вікні.", popup: "Дозволь спливні вікна для цієї сторінки й повтори спробу.",
    submitted: "Заявку подано. Щойно адміністрація її розгляне, бот повідомить тебе в Discord.",
    network: "Сервер трекера недоступний. Спробуй ще раз.", FLOW_EXPIRED: "Час підтвердження сплив. Почни ще раз.",
    verificationFailed: "Не вдалося підтвердити Discord. Почни ще раз.",
    DISCORD_ALREADY_LINKED: "Цей Discord уже прив’язано. Увійди у свій акаунт.",
    INVALID_CREDENTIALS: "Неправильний логін або пароль.", LOGIN_TAKEN: "Цей логін уже зайнято.",
    ACCOUNT_EXISTS: "Логін або Discord уже використовується.", RATE_LIMITED: "Забагато спроб. Спробуй пізніше.",
    INVALID_LOGIN: "Перевір формат логіна.", INVALID_NICKNAME: "Нікнейм має містити від 2 до 40 символів.",
    INVALID_PASSWORD: "Пароль має містити від 8 до 128 символів.", DISCORD_REQUIRED: "Підтвердь Discord і спробуй знову.",
    SESSION_EXPIRED: "Сесія завершилася. Увійди знову.", OAUTH_NOT_CONFIGURED: "Вхід через Discord ще не налаштовано."
  },
  en: {
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
    waiting: "Complete Discord verification in the open window.", popup: "Allow pop-ups for this page, then try again.",
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
let mode = new URLSearchParams(location.search).get("mode") === "register" ? "register" : "login";
let token = "", account = null, flow = null, identity = null, popup = null;
let verification = 0, verifying = false, busy = false, notice = "";
const t = key => Object.hasOwn(copy[language], key) ? copy[language][key] : copy[language].network;

function render() {
  document.querySelectorAll("[data-i18n]").forEach(node => { node.textContent = t(node.dataset.i18n); });
  el("modes").hidden = Boolean(account);
  el("login").hidden = Boolean(account) || mode !== "login";
  el("register").hidden = Boolean(account) || mode !== "register";
  el("profile").hidden = !account;
  el("account-title").textContent = t(account ? "profileTitle" : mode === "login" ? "loginTitle" : "registerTitle");
  el("notice").hidden = !notice;
  el("notice").textContent = notice ? t(notice) : "";
  el("verify").hidden = Boolean(identity);
  el("application").hidden = !identity;
  el("cancel").hidden = !verifying;
  el("discord").disabled = verifying || busy;
  el("discord-name").textContent = identity?.discord_username || identity?.discord_id || "";
  document.querySelectorAll("form button,#refresh,#logout").forEach(button => { button.disabled = busy; });
  if (account) {
    const states = ["pending", "active", "rejected", "banned", "deleted"];
    const state = states.includes(account.status) ? account.status : "unknown";
    el("nickname").textContent = account.nickname;
    el("handle").textContent = "@" + account.login;
    el("account-state").dataset.state = state;
    el("account-state").textContent = t(state);
    el("reason").textContent = state !== "active" ? account.status_reason || "" : "";
    el("reason").hidden = !el("reason").textContent;
  }
}

async function api(path, method, data) {
  const headers = { Accept: "application/json" };
  if (data !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = "Bearer " + token;
  const response = await fetch(API + path, {
    method, headers, body: data === undefined ? undefined : JSON.stringify(data),
    credentials: "omit", cache: "no-store", redirect: "error", signal: AbortSignal.timeout(15000)
  });
  const reply = await response.json();
  if (!response.ok || reply.status !== "success") throw new Error(reply.code || "network");
  return reply;
}

function stopVerification() {
  verification += 1;
  verifying = false;
  flow = null;
  identity = null;
  if (popup && !popup.closed) popup.close();
  popup = null;
}

el("discord").addEventListener("click", async () => {
  stopVerification();
  popup = window.open("about:blank", "_blank", "popup,width=520,height=720");
  if (!popup) { notice = "popup"; render(); return; }
  popup.opener = null;
  const current = verification;
  verifying = true;
  notice = "waiting";
  render();
  try {
    const result = await api("/discord/start", "POST", { language });
    if (current !== verification) return;
    const url = new URL(result.authorization_url);
    if (url.origin !== "https://discord.com" || url.pathname !== "/oauth2/authorize")
      throw new Error("verificationFailed");
    flow = { flow_id: result.flow_id, poll_token: result.poll_token };
    if (popup.closed) throw new Error("verificationFailed");
    popup.location.replace(url.href);
    const deadline = Number(result.expires_at) * 1000;
    while (current === verification && Date.now() < deadline) {
      await new Promise(resolve => setTimeout(resolve, 1800));
      if (current !== verification) return;
      const status = await api("/discord/status", "POST", flow);
      if (current !== verification) return;
      if (status.flow_status === "ready" && status.identity) {
        identity = status.identity;
        verifying = false;
        if (!popup.closed) popup.close();
        popup = null;
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
  el("application").reset();
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
    void run(async () => {
      try {
        const result = await api(path, "POST", registering ? { ...values, ...flow } : values);
        token = result.session_token;
        account = result.user;
        stopVerification();
        if (registering) notice = "submitted";
      } finally { form.elements.password.value = ""; }
    });
  });
}

el("refresh").addEventListener("click", () => void run(async () => { account = (await api("/me", "GET")).user; }));
el("logout").addEventListener("click", () => void run(async () => {
  await api("/logout", "POST");
  token = "";
  account = null;
  mode = "login";
  el("login").reset();
  el("application").reset();
}));

document.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => {
  if (mode === button.dataset.mode) return;
  if (verifying) stopVerification();
  mode = button.dataset.mode;
  notice = "";
  render();
}));
render();
