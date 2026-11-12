import React, {FormEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';
import {regionLabel} from '@site/src/lib/ui';

const SUBMIT_ENDPOINT = 'https://api.pingrad.app/submit-dp';
const TURNSTILE_SCRIPT_ID = 'cf-turnstile-api';
const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const COUNTRY_OPTIONS = ['US', 'UK', 'SG', 'HK', 'AU', 'Other'] as const;
const ACADEMIC_YEAR_OPTIONS = ['2025', '2026', '2027', '2028', 'Other'] as const;
const PROGRAM_OPTIONS = ['ECE', 'EE', 'CE', 'EEE', 'Other'] as const;
const TERM_OPTIONS = ['Fall', 'Spring', 'Summer', 'Other'] as const;
const DEGREE_OPTIONS = ['MS', 'MEng', 'PhD', 'Other'] as const;
const RESULT_OPTIONS = ['Offer', 'Reject', 'Waitlist', 'Other'] as const;
const GPA_SCALE_OPTIONS = ['5.0 NJUPT', '5.0 NJUPT + 4.0 PSU'] as const;

type TurnstileWidgetId = string | number;

type TurnstileRenderOptions = {
  sitekey: string;
  language: 'zh-cn' | 'en';
  callback: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement | string, options: TurnstileRenderOptions) => TurnstileWidgetId;
  reset: (widgetId?: TurnstileWidgetId) => void;
  remove: (widgetId: TurnstileWidgetId) => void;
};

type FormState = {
  applicantName: string;
  gpaScale: string;
  njuptGpa: string;
  psuGpa: string;
  country: string;
  countryOther: string;
  school: string;
  academicYear: string;
  academicYearOther: string;
  term: string;
  termOther: string;
  degree: string;
  degreeOther: string;
  program: string;
  programOther: string;
  result: string;
  resultOther: string;
  applicationDate: string;
  decisionDate: string;
  notes: string;
};

const INITIAL_FORM_STATE: FormState = {
  applicantName: '',
  gpaScale: '',
  njuptGpa: '',
  psuGpa: '',
  country: '',
  countryOther: '',
  school: '',
  academicYear: '',
  academicYearOther: '',
  term: '',
  termOther: '',
  degree: '',
  degreeOther: '',
  program: '',
  programOther: '',
  result: '',
  resultOther: '',
  applicationDate: '',
  decisionDate: '',
  notes: ''
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function resolveSelectableValue(selected: string, customValue: string): string {
  if (selected === 'Other') {
    return customValue.trim();
  }
  return selected.trim();
}

function sanitizeGpaForSubmission(rawValue: string): string {
  return rawValue
    .replace(/[０-９]/g, (digit) => String.fromCharCode(digit.charCodeAt(0) - 65248))
    .replace(/\s+/g, '')
    .replace(/[A-Za-zＡ-Ｚａ-ｚ]/g, '')
    .replace(/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g, '')
    .replace(/[^0-9]/g, '.')
    .replace(/\.+/g, '.');
}

function optionLabel(value: string): string {
  switch (value) {
    case 'US': return regionLabel('us');
    case 'UK': return regionLabel('uk');
    case 'SG': return regionLabel('sg');
    case 'HK': return regionLabel('hk');
    case 'AU': return regionLabel('au');
    case 'Other': return translate({id: 'option.other', message: '其他'});
    case 'Fall': return translate({id: 'option.fall', message: '秋季'});
    case 'Spring': return translate({id: 'option.spring', message: '春季'});
    case 'Summer': return translate({id: 'option.summer', message: '夏季'});
    case 'Offer': return translate({id: 'option.offer', message: '录取'});
    case 'Reject': return translate({id: 'option.reject', message: '拒绝'});
    case 'Waitlist': return translate({id: 'option.waitlist', message: '候补'});
    default: return value;
  }
}

export default function SubmitDpPage(): React.JSX.Element {
  const {siteConfig, i18n: {currentLocale}} = useDocusaurusContext();
  const title = translate({id: 'submit.title', message: '分享申请结果'});
  const turnstileSiteKey =
    typeof siteConfig.customFields?.turnstileSiteKey === 'string'
      ? siteConfig.customFields.turnstileSiteKey
      : '';

  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<string>('');

  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<TurnstileWidgetId | null>(null);

  const countryValue = useMemo(
    () => resolveSelectableValue(form.country, form.countryOther),
    [form.country, form.countryOther]
  );
  const academicYearValue = useMemo(
    () => resolveSelectableValue(form.academicYear, form.academicYearOther),
    [form.academicYear, form.academicYearOther]
  );
  const programValue = useMemo(
    () => resolveSelectableValue(form.program, form.programOther),
    [form.program, form.programOther]
  );
  const termValue = useMemo(
    () => resolveSelectableValue(form.term, form.termOther),
    [form.term, form.termOther]
  );
  const degreeValue = useMemo(
    () => resolveSelectableValue(form.degree, form.degreeOther),
    [form.degree, form.degreeOther]
  );
  const resultValue = useMemo(
    () => resolveSelectableValue(form.result, form.resultOther),
    [form.result, form.resultOther]
  );

  const requiredFieldsReady = useMemo(() => {
    const njuptGpaReady = form.njuptGpa.trim() !== '';

    return Boolean(
      form.applicantName.trim() &&
      form.gpaScale &&
      njuptGpaReady &&
      countryValue &&
      form.school.trim() &&
      academicYearValue &&
      termValue &&
      degreeValue &&
      programValue &&
      resultValue
    );
  }, [
    form.applicantName,
    form.gpaScale,
    form.njuptGpa,
    form.school,
    countryValue,
    academicYearValue,
    programValue,
    termValue,
    degreeValue,
    resultValue
  ]);

  const canSubmit = Boolean(
    turnstileSiteKey && requiredFieldsReady && turnstileToken && !isSubmitting
  );

  const resetTurnstile = useCallback((): void => {
    setTurnstileToken('');
    if (turnstileWidgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }
  }, []);

  const renderTurnstile = useCallback((): void => {
    if (!turnstileSiteKey || !turnstileContainerRef.current || !window.turnstile) {
      return;
    }

    if (turnstileWidgetIdRef.current !== null) {
      window.turnstile.remove(turnstileWidgetIdRef.current);
      turnstileWidgetIdRef.current = null;
    }

    turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: turnstileSiteKey,
      language: currentLocale === 'en' ? 'en' : 'zh-cn',
      callback: (token: string) => {
        setTurnstileToken(token);
        setSubmitError('');
      },
      'expired-callback': () => {
        setTurnstileToken('');
      },
      'error-callback': () => {
        setTurnstileToken('');
        setSubmitError(translate({id: 'submit.captchaError', message: '验证码加载失败，请刷新页面后重试。'}));
      }
    });
  }, [turnstileSiteKey, currentLocale]);

  useEffect(() => {
    if (!turnstileSiteKey || typeof window === 'undefined') {
      return;
    }

    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;
    const handleScriptLoad = (): void => {
      renderTurnstile();
    };
    const handleScriptError = (): void => {
      setSubmitError(translate({id: 'submit.captchaScriptError', message: '验证码脚本加载失败，请稍后重试。'}));
    };

    if (existingScript) {
      existingScript.addEventListener('load', handleScriptLoad);
      existingScript.addEventListener('error', handleScriptError);
      return () => {
        existingScript.removeEventListener('load', handleScriptLoad);
        existingScript.removeEventListener('error', handleScriptError);
      };
    }

    const script = document.createElement('script');
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', handleScriptLoad);
    script.addEventListener('error', handleScriptError);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleScriptLoad);
      script.removeEventListener('error', handleScriptError);
    };
  }, [renderTurnstile, turnstileSiteKey]);

  useEffect(() => {
    return () => {
      if (turnstileWidgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
      }
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    if (!requiredFieldsReady) {
      setSubmitError(translate({id: 'submit.required', message: '请填写所有必填字段。'}));
      return;
    }

    if (!turnstileSiteKey) {
      setSubmitError(translate({id: 'submit.captchaUnavailable', message: '验证码暂不可用，请联系维护者。'}));
      return;
    }

    if (!turnstileToken) {
      setSubmitError(translate({id: 'submit.captchaRequired', message: '请先完成验证码。'}));
      return;
    }

    const sanitizedNjuptGpa = sanitizeGpaForSubmission(form.njuptGpa);
    const sanitizedPsuGpa = sanitizeGpaForSubmission(form.psuGpa);

    const payload = {
      申请人: form.applicantName.trim(),
      分数制: form.gpaScale,
      'NJUPT GPA': sanitizedNjuptGpa,
      'PSU GPA': sanitizedPsuGpa || null,
      国家: countryValue,
      学校: form.school.trim(),
      学年: academicYearValue,
      学期: termValue,
      学位: degreeValue,
      项目: programValue,
      结果: resultValue,
      网申提交时间: form.applicationDate ? form.applicationDate : null,
      结果通知时间: form.decisionDate ? form.decisionDate : null,
      补充说明: form.notes.trim(),
      turnstileToken
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(SUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let errorMessage = translate({id: 'submit.failed', message: '提交失败，请稍后重试。'});
        const rawErrorBody = await response.text();
        if (rawErrorBody) {
          try {
            const parsedError = JSON.parse(rawErrorBody) as {error?: string; message?: string};
            if (typeof parsedError.error === 'string' && parsedError.error.trim()) {
              errorMessage = parsedError.error;
            } else if (typeof parsedError.message === 'string' && parsedError.message.trim()) {
              errorMessage = parsedError.message;
            } else {
              errorMessage = rawErrorBody;
            }
          } catch {
            errorMessage = rawErrorBody;
          }
        }
        throw new Error(errorMessage);
      }

      setSubmitSuccess(translate({id: 'submit.success', message: '提交成功，等待审核。'}));
      setForm((current) => ({
        ...INITIAL_FORM_STATE,
        country: current.country,
        countryOther: current.country === 'Other' ? current.countryOther : '',
        academicYear: current.academicYear,
        academicYearOther: current.academicYear === 'Other' ? current.academicYearOther : ''
      }));
      resetTurnstile();
    } catch (error) {
      setSubmitError(error instanceof Error && error.message !== 'Failed to fetch' ? error.message : translate({id: 'submit.failed', message: '提交失败，请稍后重试。'}));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange =
    (key: keyof FormState) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ): void => {
      const {value} = event.target;
      setForm((current) => ({
        ...current,
        [key]: value
      }));
    };

  const handleTermChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const nextValue = event.target.value;
    setForm((current) => ({
      ...current,
      term: nextValue,
      termOther: nextValue === 'Other' ? current.termOther : ''
    }));
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const nextValue = event.target.value;
    setForm((current) => ({
      ...current,
      country: nextValue,
      countryOther: nextValue === 'Other' ? current.countryOther : ''
    }));
  };

  const handleAcademicYearChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const nextValue = event.target.value;
    setForm((current) => ({
      ...current,
      academicYear: nextValue,
      academicYearOther: nextValue === 'Other' ? current.academicYearOther : ''
    }));
  };

  const handleDegreeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const nextValue = event.target.value;
    setForm((current) => ({
      ...current,
      degree: nextValue,
      degreeOther: nextValue === 'Other' ? current.degreeOther : ''
    }));
  };

  const handleResultChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const nextValue = event.target.value;
    setForm((current) => ({
      ...current,
      result: nextValue,
      resultOther: nextValue === 'Other' ? current.resultOther : ''
    }));
  };

  const handleProgramChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const nextValue = event.target.value;
    setForm((current) => ({
      ...current,
      program: nextValue,
      programOther: nextValue === 'Other' ? current.programOther : ''
    }));
  };

  return (
    <Layout title={title} description={translate({id: 'submit.description', message: '分享申请背景与录取结果，审核后展示。'})}>
      <main className="pin-submit-page">
        <section className="pin-submit-card" aria-label={title}>
          <header className="pin-submit-header">
            <h1>{title}</h1>
            <p><Translate id="submit.reviewNote">提交后会进入人工审核，审核通过后会展示在站内。</Translate></p>
          </header>

          <form className="pin-submit-form" onSubmit={handleSubmit}>
            <label className="pin-form-field">
              <span><Translate id="submit.applicant">申请人</Translate> *</span>
              <input
                type="text"
                value={form.applicantName}
                onChange={handleInputChange('applicantName')}
                placeholder={translate({id: 'submit.applicantPlaceholder', message: '可填昵称，不建议填真名'})}
                required
              />
              <p className="pin-form-hint"><Translate id="submit.applicantHint">随意填，可以填昵称，不建议填真名。</Translate></p>
            </label>

            <label className="pin-form-field">
              <span><Translate id="submit.gpaScale">分数制</Translate> *</span>
              <select value={form.gpaScale} onChange={handleInputChange('gpaScale')} required>
                <option value=""><Translate id="submit.select">请选择</Translate></option>
                {GPA_SCALE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {optionLabel(option)}
                  </option>
                ))}
              </select>
            </label>

            <label className="pin-form-field">
              <span>NJUPT GPA *</span>
              <input
                type="text"
                inputMode="decimal"
                value={form.njuptGpa}
                onChange={handleInputChange('njuptGpa')}
                placeholder={translate({id: 'submit.njuptGpaExample', message: '例如：4.23'})}
                required
              />
            </label>

            <label className="pin-form-field">
              <span>PSU GPA</span>
              <input
                type="text"
                inputMode="decimal"
                value={form.psuGpa}
                onChange={handleInputChange('psuGpa')}
                placeholder={translate({id: 'submit.psuGpaExample', message: '例如：3.78'})}
              />
            </label>

            <label className="pin-form-field">
              <span><Translate id="submit.country">国家</Translate> *</span>
              <select value={form.country} onChange={handleCountryChange} required>
                <option value=""><Translate id="submit.select">请选择</Translate></option>
                {COUNTRY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {optionLabel(option)}
                  </option>
                ))}
              </select>
            </label>
            {form.country === 'Other' ? (
              <label className="pin-form-field">
                <span><Translate id="submit.countryOther">国家（其他）</Translate> *</span>
                <input
                  type="text"
                  value={form.countryOther}
                  onChange={handleInputChange('countryOther')}
                  placeholder={translate({id: 'submit.countryPlaceholder', message: '请输入自定义国家'})}
                  required
                />
              </label>
            ) : null}

            <label className="pin-form-field">
              <span><Translate id="submit.school">学校</Translate> *</span>
              <input
                type="text"
                value={form.school}
                onChange={handleInputChange('school')}
                placeholder={translate({id: 'submit.schoolPlaceholder', message: '例如：Carnegie Mellon University'})}
                required
              />
            </label>

            <label className="pin-form-field">
              <span><Translate id="submit.year">学年</Translate> *</span>
              <select value={form.academicYear} onChange={handleAcademicYearChange} required>
                <option value=""><Translate id="submit.select">请选择</Translate></option>
                {ACADEMIC_YEAR_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {optionLabel(option)}
                  </option>
                ))}
              </select>
            </label>
            {form.academicYear === 'Other' ? (
              <label className="pin-form-field">
                <span><Translate id="submit.yearOther">学年（其他）</Translate> *</span>
                <input
                  type="text"
                  value={form.academicYearOther}
                  onChange={handleInputChange('academicYearOther')}
                  placeholder={translate({id: 'submit.yearPlaceholder', message: '请输入自定义学年'})}
                  required
                />
              </label>
            ) : null}

            <label className="pin-form-field">
              <span><Translate id="submit.term">学期</Translate> *</span>
              <select value={form.term} onChange={handleTermChange} required>
                <option value=""><Translate id="submit.select">请选择</Translate></option>
                {TERM_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {optionLabel(option)}
                  </option>
                ))}
              </select>
            </label>
            {form.term === 'Other' ? (
              <label className="pin-form-field">
                <span><Translate id="submit.termOther">学期（其他）</Translate> *</span>
                <input
                  type="text"
                  value={form.termOther}
                  onChange={handleInputChange('termOther')}
                  placeholder={translate({id: 'submit.termPlaceholder', message: '请输入自定义学期'})}
                  required
                />
              </label>
            ) : null}

            <label className="pin-form-field">
              <span><Translate id="submit.degree">学位</Translate> *</span>
              <select value={form.degree} onChange={handleDegreeChange} required>
                <option value=""><Translate id="submit.select">请选择</Translate></option>
                {DEGREE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {optionLabel(option)}
                  </option>
                ))}
              </select>
            </label>
            {form.degree === 'Other' ? (
              <label className="pin-form-field">
                <span><Translate id="submit.degreeOther">学位（其他）</Translate> *</span>
                <input
                  type="text"
                  value={form.degreeOther}
                  onChange={handleInputChange('degreeOther')}
                  placeholder={translate({id: 'submit.degreePlaceholder', message: '请输入自定义学位'})}
                  required
                />
              </label>
            ) : null}

            <label className="pin-form-field">
              <span><Translate id="submit.program">项目</Translate> *</span>
              <select value={form.program} onChange={handleProgramChange} required>
                <option value=""><Translate id="submit.select">请选择</Translate></option>
                {PROGRAM_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {optionLabel(option)}
                  </option>
                ))}
              </select>
            </label>
            {form.program === 'Other' ? (
              <label className="pin-form-field">
                <span><Translate id="submit.programOther">项目（其他）</Translate> *</span>
                <input
                  type="text"
                  value={form.programOther}
                  onChange={handleInputChange('programOther')}
                  placeholder={translate({id: 'submit.programPlaceholder', message: '请输入自定义项目'})}
                  required
                />
              </label>
            ) : null}

            <label className="pin-form-field">
              <span><Translate id="submit.result">结果</Translate> *</span>
              <select value={form.result} onChange={handleResultChange} required>
                <option value=""><Translate id="submit.select">请选择</Translate></option>
                {RESULT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {optionLabel(option)}
                  </option>
                ))}
              </select>
            </label>
            {form.result === 'Other' ? (
              <label className="pin-form-field">
                <span><Translate id="submit.resultOther">结果（其他）</Translate> *</span>
                <input
                  type="text"
                  value={form.resultOther}
                  onChange={handleInputChange('resultOther')}
                  placeholder={translate({id: 'submit.resultPlaceholder', message: '请输入自定义结果'})}
                  required
                />
              </label>
            ) : null}

            <label className="pin-form-field">
              <span><Translate id="submit.applicationDate">网申提交时间</Translate></span>
              <input
                type="date"
                value={form.applicationDate}
                onChange={handleInputChange('applicationDate')}
              />
            </label>

            <label className="pin-form-field">
              <span><Translate id="submit.decisionDate">结果通知时间</Translate></span>
              <input type="date" value={form.decisionDate} onChange={handleInputChange('decisionDate')} />
            </label>

            <label className="pin-form-field pin-form-field--full">
              <span><Translate id="submit.notes">补充说明</Translate></span>
              <textarea
                rows={4}
                value={form.notes}
                onChange={handleInputChange('notes')}
                placeholder={translate({id: 'submit.notesPlaceholder', message: '可选：补充你的背景（托福、竞赛科研情况、2+2/3+1/4+0 等）、奖学金、面试轮次等信息'})}
              />
            </label>

            <div className="pin-form-field pin-form-field--full">
              <span><Translate id="submit.captcha">验证码</Translate> *</span>
              <div className="cf-turnstile" ref={turnstileContainerRef} />
              {!turnstileSiteKey ? (
                <p className="pin-form-hint">
                  <Translate id="submit.captchaUnavailable">验证码暂不可用，请联系维护者。</Translate>
                </p>
              ) : null}
              {!turnstileToken ? <p className="pin-form-hint"><Translate id="submit.captchaHint">请先完成验证码再提交。</Translate></p> : null}
            </div>

            {submitError ? (
              <p className="pin-form-feedback pin-form-feedback--error" role="alert">
                {submitError}
              </p>
            ) : null}
            {submitSuccess ? (
              <p className="pin-form-feedback pin-form-feedback--success" role="status">
                {submitSuccess}
              </p>
            ) : null}

            <div className="pin-submit-actions">
              <button type="submit" className="button button--primary" disabled={!canSubmit}>
                {isSubmitting ? translate({id: 'submit.submitting', message: '提交中…'}) : translate({id: 'submit.button', message: '提交'})}
              </button>
            </div>
          </form>
        </section>
      </main>
    </Layout>
  );
}
