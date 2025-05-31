# Zadanie 2

Link do repozytorium na DockerHub z danymi cache [https://hub.docker.com/r/1camile/zadanie2/tags](https://hub.docker.com/r/1camile/zadanie2/tags)

## Opis wykonania poszczególnych etapów zadania

### Uruchomienie

Opracowany łańcuch w usłudzie GitHub Actions uruchamia się przy przesyłaniu plików do gałęzi main w tym repozytorium, a także przy przesyłaniu tagów do niego. Może być również uruchomiony ręcznie z interfejsu GitHub Actions.

### Deklarowanie środowiska

Runner działa na maszynie z systemem ubuntu. Zastosowane zostały akcje: checkout do pobrania kodu źródłowego z repozytorium GitHub, Docker Setup Buildx i Docker Setup QEMU aby zainstalować wszystkie niezbędne komponenty do budowania obrazu z wykorzystaniem silnika Buildkit.

### Tagowanie obrazów

Do tagowania obrazu kontenera na podstawie Dockerfile-a oraz kodów źródłowych aplikacji opracowanej jako rozwiązanie zadania nr 1 zastosowano Docker Metadata action, gdzie w zależności od sposobu uruchomienia łańcucha obraz jest tagowany na dwa sosoby:
- przy push branch - jako typ sha, short z prefix=zad2-
- przy push tag - jako typ semver z pattern={nazwa taga}

### Logowanie

Logowanie do GitHuba i DockerHuba odbywa sie za pomoca akcji Docker login używajac zmiennych z nazwą użytkownika i sekretów z tokenami.

### Budowanie obrazu do testu

Używając Docker build push action budowany jest obraz z Docerfile wspierający jedną architekture z wykorzystaniem danych cache, przechowywanych na publicznym repozytorium DockerHub. Zbudowany obraz zostanie załadowany lokalnie do silnika Dockera na maszynie, na której działa GitHub Actions runner.

### Testowanie obrazu z Trivy

Zbudowany obraz zosatnie przeskanowany przez trivy używając aquasecurity trivy action. W zależności czy zostaną znalezione zagrożenia sklasyfikowane jako krytyczne lub wysokie, zostane zwrócony odpowiedni kod wyjścowy.

### Budowanie obrazu i przesłanie go do publicznego repozytorium na Github

Jeśli obraz testowy przejdzie test CVE to zostanie zbudowany obraz wspierający dwie architektury (linux/arm64 oraz linux/amd64) i wykorzystujący dane cache, który zostanie przesłany do repozytorium.