import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { defaultSiteContent } from "../data/defaultContent";

const SiteContext = createContext(null);

const STORAGE_KEY = "verdot_cms_content";
const USERS_KEY = "verdot_cms_users";
const AUTH_KEY = "verdot_cms_auth";

function loadContent() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultSiteContent;
  } catch {
    return defaultSiteContent;
  }
}

function saveContent(content) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function SiteProvider({ children }) {
  const [content, setContent] = useState(loadContent);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    saveContent(content);
  }, [content]);

  // Deep-update a nested path. E.g. updateContent("pages.home.sections.0.heading", "New Title")
  const updateContent = useCallback((path, value) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let target = next;
      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]];
        if (target === undefined) return prev;
      }
      target[keys[keys.length - 1]] = value;
      return next;
    });
  }, []);

  const replaceContent = useCallback((newContent) => {
    setContent(newContent);
  }, []);

  const resetContent = useCallback(() => {
    setContent(defaultSiteContent);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Auth helpers
  const login = useCallback((user) => {
    setCurrentUser(user);
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  // Page management
  const addPage = useCallback((pageId, pageData) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      next.pages[pageId] = pageData;
      return next;
    });
  }, []);

  const deletePage = useCallback((pageId) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      delete next.pages[pageId];
      return next;
    });
  }, []);

  // Section management
  const addSection = useCallback((pageId, section) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      if (next.pages[pageId]) {
        next.pages[pageId].sections.push(section);
      }
      return next;
    });
  }, []);

  const removeSection = useCallback((pageId, sectionIndex) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      if (next.pages[pageId]) {
        next.pages[pageId].sections.splice(sectionIndex, 1);
      }
      return next;
    });
  }, []);

  const reorderSections = useCallback((pageId, fromIndex, toIndex) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      if (next.pages[pageId]) {
        const sections = next.pages[pageId].sections;
        const [moved] = sections.splice(fromIndex, 1);
        sections.splice(toIndex, 0, moved);
      }
      return next;
    });
  }, []);

  // News management
  const addNews = useCallback((article) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      next.news.unshift(article);
      return next;
    });
  }, []);

  const updateNews = useCallback((id, updates) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      const idx = next.news.findIndex((n) => n.id === id);
      if (idx >= 0) {
        next.news[idx] = { ...next.news[idx], ...updates };
      }
      return next;
    });
  }, []);

  const deleteNews = useCallback((id) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      next.news = next.news.filter((n) => n.id !== id);
      return next;
    });
  }, []);

  // Navigation management
  const updateNavigation = useCallback((nav) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      next.navigation = nav;
      return next;
    });
  }, []);

  return (
    <SiteContext.Provider
      value={{
        content,
        updateContent,
        replaceContent,
        resetContent,
        currentUser,
        login,
        logout,
        addPage,
        deletePage,
        addSection,
        removeSection,
        reorderSections,
        addNews,
        updateNews,
        deleteNews,
        updateNavigation,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
