import React, {FormEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

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

type TurnstileWidgetId = string | number;

type TurnstileRenderOptions = {
  sitekey: string;
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

export default function SubmitDpPage(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
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
    return Boolean(
      countryValue &&
      form.school.trim() &&
      academicYearValue &&
      termValue &&
      degreeValue &&
      programValue &&
      resultValue
    );
  }, [
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
      callback: (token: string) => {
        setTurnstileToken(token);
        setSubmitError('');
      },
      'expired-callback': () => {
        setTurnstileToken('');
      },
      'error-callback': () => {
        setTurnstileToken('');
        setSubmitError('验证码加载失败，请刷新页面后重试。');
      }
    });
  }, [turnstileSiteKey]);

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
      setSubmitError('验证码脚本加载失败，请稍后重试。');
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
      setSubmitError('请填写所有必填字段。');
      return;
    }

    if (!turnstileSiteKey) {
      setSubmitError('Turnstile site key 未配置。');
      return;
    }

    if (!turnstileToken) {
      setSubmitError('请先完成验证码。');
      return;
    }

    const payload = {
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
        let errorMessage = '提交失败，请稍后重试。';
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

      setSubmitSuccess('Submitted! Pending review.');
      setForm((current) => ({
        ...INITIAL_FORM_STATE,
        country: current.country,
        countryOther: current.country === 'Other' ? current.countryOther : '',
        academicYear: current.academicYear,
        academicYearOther: current.academicYear === 'Other' ? current.academicYearOther : ''
      }));
      resetTurnstile();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '提交失败，请稍后重试。');
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
    <Layout title="Submit DP" description="Submit a new datapoint for review.">
      <main className="pin-submit-page">
        <section className="pin-submit-card" aria-label="Submit DP form">
          <header className="pin-submit-header">
            <h1>Submit DP</h1>
            <p>提交后会进入人工审核，审核通过后会展示在站内。</p>
          </header>

          <form className="pin-submit-form" onSubmit={handleSubmit}>
            <label className="pin-form-field">
              <span>国家 *</span>
              <select value={form.country} onChange={handleCountryChange} required>
                <option value="">请选择</option>
                {COUNTRY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            {form.country === 'Other' ? (
              <label className="pin-form-field">
                <span>国家（Other）*</span>
                <input
                  type="text"
                  value={form.countryOther}
                  onChange={handleInputChange('countryOther')}
                  placeholder="请输入自定义国家"
                  required
                />
              </label>
            ) : null}

            <label className="pin-form-field">
              <span>学校 *</span>
              <input
                type="text"
                value={form.school}
                onChange={handleInputChange('school')}
                placeholder="例如：Carnegie Mellon University"
                required
              />
            </label>

            <label className="pin-form-field">
              <span>学年 *</span>
              <select value={form.academicYear} onChange={handleAcademicYearChange} required>
                <option value="">请选择</option>
                {ACADEMIC_YEAR_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            {form.academicYear === 'Other' ? (
              <label className="pin-form-field">
                <span>学年（Other）*</span>
                <input
                  type="text"
                  value={form.academicYearOther}
                  onChange={handleInputChange('academicYearOther')}
                  placeholder="请输入自定义学年"
                  required
                />
              </label>
            ) : null}

            <label className="pin-form-field">
              <span>学期 *</span>
              <select value={form.term} onChange={handleTermChange} required>
                <option value="">请选择</option>
                {TERM_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            {form.term === 'Other' ? (
              <label className="pin-form-field">
                <span>学期（Other）*</span>
                <input
                  type="text"
                  value={form.termOther}
                  onChange={handleInputChange('termOther')}
                  placeholder="请输入自定义学期"
                  required
                />
              </label>
            ) : null}

            <label className="pin-form-field">
              <span>学位 *</span>
              <select value={form.degree} onChange={handleDegreeChange} required>
                <option value="">请选择</option>
                {DEGREE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            {form.degree === 'Other' ? (
              <label className="pin-form-field">
                <span>学位（Other）*</span>
                <input
                  type="text"
                  value={form.degreeOther}
                  onChange={handleInputChange('degreeOther')}
                  placeholder="请输入自定义学位"
                  required
                />
              </label>
            ) : null}

            <label className="pin-form-field">
              <span>项目 *</span>
              <select value={form.program} onChange={handleProgramChange} required>
                <option value="">请选择</option>
                {PROGRAM_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            {form.program === 'Other' ? (
              <label className="pin-form-field">
                <span>项目（Other）*</span>
                <input
                  type="text"
                  value={form.programOther}
                  onChange={handleInputChange('programOther')}
                  placeholder="请输入自定义项目"
                  required
                />
              </label>
            ) : null}

            <label className="pin-form-field">
              <span>结果 *</span>
              <select value={form.result} onChange={handleResultChange} required>
                <option value="">请选择</option>
                {RESULT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            {form.result === 'Other' ? (
              <label className="pin-form-field">
                <span>结果（Other）*</span>
                <input
                  type="text"
                  value={form.resultOther}
                  onChange={handleInputChange('resultOther')}
                  placeholder="请输入自定义结果"
                  required
                />
              </label>
            ) : null}

            <label className="pin-form-field">
              <span>网申提交时间</span>
              <input
                type="date"
                value={form.applicationDate}
                onChange={handleInputChange('applicationDate')}
              />
            </label>

            <label className="pin-form-field">
              <span>结果通知时间</span>
              <input type="date" value={form.decisionDate} onChange={handleInputChange('decisionDate')} />
            </label>

            <label className="pin-form-field pin-form-field--full">
              <span>补充说明</span>
              <textarea
                rows={4}
                value={form.notes}
                onChange={handleInputChange('notes')}
                placeholder="可选：补充你的背景、奖学金、面试轮次等信息"
              />
            </label>

            <div className="pin-form-field pin-form-field--full">
              <span>验证码 *</span>
              <div className="cf-turnstile" ref={turnstileContainerRef} />
              {!turnstileSiteKey ? (
                <p className="pin-form-hint">
                  Turnstile site key 未配置，请在配置文件中设置后再提交。
                </p>
              ) : null}
              {!turnstileToken ? <p className="pin-form-hint">请先完成验证码再提交。</p> : null}
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
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </Layout>
  );
}
