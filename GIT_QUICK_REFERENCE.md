# 🚀 Quick Git Reference Card

## Your Current Status

```
✅ You are PERFECTLY SYNCED with remote
✅ No commits pending
✅ No uncommitted changes
✅ Ready to work
```

---

## The Basic 5-Step Workflow

```
1. git pull origin main --no-rebase     ← Get friend's changes
2. [Edit your files]                     ← Make changes
3. git add .                             ← Stage changes
4. git commit -m "your message"          ← Create commit
5. git push origin main                  ← Upload to remote
```

---

## Common Situations

### **Situation 1: You want to make a change**
```bash
git pull origin main --no-rebase
# Make edits
git add .
git commit -m "feat: describe it"
git push origin main
```

### **Situation 2: Friend pushed new stuff**
```bash
git pull origin main --no-rebase
# Now you have their changes
git push origin main  # If you have local commits
```

### **Situation 3: You made a mistake**
```bash
git reset --soft HEAD~1  # Undo last commit, keep changes
# Re-do it correctly
git add .
git commit -m "correct message"
git push origin main
```

### **Situation 4: You see "nothing to commit"**
```bash
# Make sure you:
1. Edited a file
2. Saved the file
3. Then run: git status
```

---

## Error Codes Quick Fix

| Error | Quick Fix |
|-------|-----------|
| "nothing to commit" | Edit a file, save, then try again |
| "ahead of origin/main" | `git push origin main` |
| "divergent branches" | `git pull origin main --no-rebase` |
| "Updates rejected" | `git pull origin main --no-rebase` first |
| Merge conflicts | Edit files, remove `<<<<` markers, `git add .`, `git commit`, `git push` |

---

## Check Status Anytime

```bash
# Current branch status
git status

# See your commits
git log --oneline -5

# See what you changed
git diff

# See everything in graph
git log --graph --oneline -10
```

---

## Remember

- ✅ **Always pull first** before making changes
- ✅ **Commit often** with clear messages  
- ✅ **Push immediately** after committing
- ✅ **Check status** if unsure

---

You're all set! No issues. Just follow the 5-step workflow! 🎉
